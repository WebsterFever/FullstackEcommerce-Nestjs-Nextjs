import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity({ name: 'orderdetails' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  // ✅ Many orderDetails → one Order
  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  // ✅ Many orderDetails ↔ many Products
  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_details_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_detail_id',
      referencedColumnName: 'id',
    },
  })
  products!: Product[];
}
