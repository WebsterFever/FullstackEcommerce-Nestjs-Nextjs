import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/orderDetails.entity';
import { User } from '../entities/user.entity';
import { ProductDto } from './dto/order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetail', 'orderDetail.products', 'user'],
    });

    if (!order) {
      throw new NotFoundException({
        message: `Order with id ${id} not found`,
        error: 'Not Found',
        statusCode: 404,
      });
    }

    return {
      message: 'Order found successfully',
      data: order,
    };
  }

  async addOrder(userId: string, products: ProductDto[]) {
    let total = 0;

    // 1. Verificamos que exista el Usuario
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException({
        message: `Usuario con id ${userId} no encontrado`,
        error: 'User Not Found',
        statusCode: 404,
      });
    }

    // 2. Creamos la Orden
    const order = new Order();
    order.date = new Date();
    order.user = user;

    // 3. Guardamos la Orden en la DB
    const newOrder = await this.ordersRepository.save(order);

    // 4. Asociamos Productos
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });

        // Verificamos si existe el producto
        if (!product) {
          throw new NotFoundException({
            message: `Producto con id ${element.id} no encontrado`,
            error: 'Product Not Found',
            statusCode: 404,
          });
        }

        // Verificamos stock disponible
        if (product.stock <= 0) {
          throw new BadRequestException({
            message: `Producto ${product.name} sin stock disponible`,
            error: 'Out Of Stock',
            statusCode: 400,
          });
        }

        // Calculamos total
        total += Number(product.price);

        // Actualizamos stock
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    // 5. Creamos OrderDetail
    const orderDetail = new OrderDetail();
    orderDetail.price = total;
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    // 6. Guardamos OrderDetail
    const savedOrderDetail = await this.orderDetailRepository.save(orderDetail);

    // 7. Asociamos OrderDetail con Order
    newOrder.orderDetail = savedOrderDetail;

    await this.ordersRepository.save(newOrder);

    return {
      message: 'Order created successfully',
      data: newOrder,
    };
  }
}
