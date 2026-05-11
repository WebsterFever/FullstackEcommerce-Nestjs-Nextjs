import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  phone!: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  country!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  city!: string;

  // ✅ 1 user → many orders
  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders!: Order[];
}
