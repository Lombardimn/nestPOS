import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, In, Repository } from 'typeorm';
import { Transaction, TransactionContent } from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { CouponsService } from 'src/coupons/coupons.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContent) private readonly transactionContentRepository: Repository<TransactionContent>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,

    private readonly couponsService: CouponsService
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {

    /** Iniciar la transaccion */
    await this.productRepository.manager.transaction(async (transactionEntityManager) => {
      const transaction = new Transaction()

      /** Calcular el total y asignarlo */
      const total = createTransactionDto.contents.reduce(
        (total, item) => total + (item.price * item.quantity) , 0
      )
      transaction.total = total

      /** Calcular el descuento si existe un cupón */
      if (createTransactionDto.coupon) {
        const coupon = await this.couponsService.applyCoupon({ coupon_name: createTransactionDto.coupon })
        const discount = (coupon.percentage / 100) * total

        /** Asignar los nuevos valores */
        transaction.discount = discount
        transaction.coupon = coupon.name
        transaction.total -= discount
      }

      for (const contents of createTransactionDto.contents) {
        const product = await transactionEntityManager.findOneBy( Product,{ id: contents.productId })

        /** Creo el array de Errores */
        let errors: string[] = []

        /** Validar si el producto existe */
        if (!product) {
          errors.push(`El producto con ID ${contents.productId} no fue encontrado`)
          throw new NotFoundException(errors)
        }

        /** Validar si hay stock suficiente */
        if (product.stock < contents.quantity) {
          errors.push(`El producto ${product.name} no tiene stock suficiente`)
          throw new BadRequestException(errors)
        }

        /** Reducir el stock */
        product.stock -= contents.quantity

        /** Crear instanci de TransactionContent */
        const transactionContent = new TransactionContent()
        transactionContent.price = contents.price
        transactionContent.product = product
        transactionContent.quantity = contents.quantity
        transactionContent.transaction = transaction

        await transactionEntityManager.save(transaction)
        await transactionEntityManager.save(transactionContent)
      }
    })

    return 'Venta registrada correctamente.'
  }

  findAll(transactionDate?: string) {
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true
      }
    }

    /** Verificar si existe una Query */
    if (transactionDate) {
      const date = parseISO(transactionDate)

      /** Validar si la fecha ingresada es valida */
      if (!isValid(date)) {
        throw new BadRequestException('La fecha ingresada no es valida')
      }

      /** Definir el rango de fechas */
      const start = startOfDay(date)
      const end = endOfDay(date)

      /** Incorporar el rango de fechas en la consulta */
      options.where = {
        transactionDate: Between(start, end)
      }
    }

    return this.transactionRepository.find(options)
  }

  async findOne(id: number) {
    const transaccion = await this.transactionRepository.findOne({
      where: {
        id
      },
      relations: {
        contents: true
      }
    })

    if (!transaccion) {
      throw new NotFoundException(`La transaccion con el ID: ${id} no existe`)
    }

    return transaccion
  }

  async remove(id: number) {
    /** Iniciar la transaccion */
    await this.transactionRepository.manager.transaction(async (transactionEntityManager) => {
      const transaccion = await transactionEntityManager.findOne(Transaction, {
        where: {
          id
        },
        relations: {
          contents: true
        }
      })

      if (!transaccion) {
        throw new NotFoundException(`La transaccion con el ID: ${id} no existe`)
      }

      /** Eliminar los productos de la transaccion manteniendo la integridad de la DB */
      for (const content of transaccion.contents) {
        /** Revertir el stock */
        const product = await transactionEntityManager.findOneBy(Product, { id: content.product.id })
        
        if (!product) {
          throw new NotFoundException(`El producto con el ID: ${content.product.id} no existe`)
        }

        product.stock += content.quantity
        
        await transactionEntityManager.save(product)
        await transactionEntityManager.remove(TransactionContent, content)
        }

        /** Eliminar la transaccion */
        await transactionEntityManager.remove(Transaction, transaccion)
    })

    return {
      message: `La venta: ${id} ha sido eliminada correctamente.`,
    }
  }
}
