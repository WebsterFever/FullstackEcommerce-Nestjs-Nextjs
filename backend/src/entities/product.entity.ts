import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './category.entity';
// ❗ ONLY import this if you really created it
import { OrderDetail } from './orderDetails.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock!: number;

  @ApiPropertyOptional({
    description: 'URL of the product image',
    example:
      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  @Column({
    type: 'text',
    default:
      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  imgUrl?: string;

  // ✅ MANY PRODUCTS → ONE CATEGORY
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails!: OrderDetail[];
}
