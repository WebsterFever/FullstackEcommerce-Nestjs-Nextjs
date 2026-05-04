import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductByIdService(id);
  }

  @Post()
  createProduct(@Body() product) {
    return this.productsService.createProductService(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product) {
    return this.productsService.updateProductService(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProductService(id);
  }
}
