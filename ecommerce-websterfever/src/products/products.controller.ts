import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Product[] {
    return this.productsService.getAllProductsService(page, limit);
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductByIdService(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product) {
    return this.productsService.createProductService(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() product) {
    return this.productsService.updateProductService(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProductService(id);
  }
}
