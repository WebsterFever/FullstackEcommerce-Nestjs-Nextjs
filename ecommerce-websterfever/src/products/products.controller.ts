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
import { Product } from '../entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @ApiOperation({
    summary: 'Get all products with pagination',
    description:
      'Returns a paginated list of products. You can specify the page number and the number of items per page using the query parameters "page" and "limit".',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of products has been successfully retrieved.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
  })
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Product[]> {
    return this.productsService.getProducts(page, limit);
  }
  @Post('seed')
  addProducts() {
    return this.productsService.addProducts();
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductByIdService(id);
  }

  // @Post()
  // @UseGuards(AuthGuard)
  // createProduct(@Body() product) {
  //   return this.productsService.addProducts(product);
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.updateProductService(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProductService(id);
  }
}
