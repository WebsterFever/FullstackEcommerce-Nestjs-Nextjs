import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }
}
