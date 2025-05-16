import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ 
    type: 'decimal' 
  })
  total: number

  @Column({ 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  transactionDate: Date

  @OneToMany(
    () => TransactionContent,
    (transaction) => transaction.transaction
  )
  contents: TransactionContent[]
}

@Entity()
export class TransactionContent {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int'
  })
  quantity: number

  @Column({
    type: 'decimal'
  })
  price: number

  @ManyToOne(
    () => Product,
    (product) => product.id,
    { 
      eager: true,
      cascade: true 
    }
  )
  product: Product

  @ManyToOne(
    () => Transaction,
    (transaction) => transaction.contents,
    { cascade: true }
  )
  transaction: Transaction
}
