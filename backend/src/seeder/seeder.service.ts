import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private dataSource: DataSource
  ) {}

  /** Manejo del ciclo de vida del módulo */
  async OnModuleInit() {
    const connection = this.dataSource

    /** Limpiar la base de datos */
    await connection.dropDatabase()

    /** Crear la base de datos */
    await connection.synchronize()
  }

  async seed() {
    /** Insertar categorias */
    await this.categoryRepository.save(categories)

    /** Insertar productos */
    for await (const seedProduct of products) {
      const category = await this.categoryRepository.findOneBy({ id: seedProduct.categoryId })

      if (!category) {
        throw new Error(`La categoria con el ID ${seedProduct.categoryId} no existe`)
      }

      /** Instanciar el producto */
      const product = new Product()

      product.name = seedProduct.name
      product.image = seedProduct.image
      product.price = seedProduct.price
      product.stock = seedProduct.stock
      product.category = category
      
      /** Guardar */
      await this.productRepository.save(product)
    }
  }
}
