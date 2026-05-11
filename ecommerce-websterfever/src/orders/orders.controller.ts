import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.orderService.addOrder(userId, products);
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
