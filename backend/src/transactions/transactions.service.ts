import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Transaction, TransactionContent } from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContent) private readonly transactionContentRepository: Repository<TransactionContent>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {

    /** Iniciar la transaccion */
    await this.productRepository.manager.transaction(async (transactionEntityManager) => {
      const transaction = new Transaction()
      transaction.total = createTransactionDto.contents.reduce(
        (total, item) => total + (item.price * item.quantity) , 0
      )

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

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
