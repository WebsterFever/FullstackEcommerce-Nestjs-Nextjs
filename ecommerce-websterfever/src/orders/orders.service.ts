import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Product } from '../entities/product.entity';
import { ProductDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  addOrder(userId: string, products: ProductDto[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.ordersRepository.addOrder(userId, products);
  }
}
