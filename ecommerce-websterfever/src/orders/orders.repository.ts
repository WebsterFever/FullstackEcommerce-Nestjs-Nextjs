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
      return `Orden con id ${id} no encontrada`;
    }

    return order;
  }

  async addOrder(userId: string, products: Product[]) {
    let total = 0;

    // 1.Verificamos que exista el Usuario:
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      return `Usuario con id ${userId} no encontrado`;
      //throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    // 2. Creamos la Orden:
    const order = new Order();
    order.date = new Date();
    order.user = user;

    // 3. Creamos la orden en la DB
    const newOrder = await this.ordersRepository.save(order);

    // Asociamos cada "id" recibido con el "Producto"
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });

        if (!product) {
          // return `Producto con id ${element.id} no encontrado`;
          throw new NotFoundException(
            `Producto con id ${element.id} no encontrado`,
          );
        }

        /* Calculamos el Monto total: */
        total += Number(product.price);

        /* Actualizamos el "Stock": */
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    if (productsArray.length === 0)
      throw new BadRequestException(
        'Ninguno de los productos está disponible en stock',
      );

    // 4. Creamos "OrderDetail" y la insertamos en BBDD:
    const orderDetail = new OrderDetail();

    /* toFixed(2) formatea la cantidad de decimales */
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailRepository.save(orderDetail);

    // Le enviamos al cliente la compra con la info
    // de los productos
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetail: true,
      },
    });
  }
}
