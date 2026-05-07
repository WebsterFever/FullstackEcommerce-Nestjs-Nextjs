import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  addOrder(userId: string, products: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.ordersRepository.addOrder(userId, products);
  }
}
