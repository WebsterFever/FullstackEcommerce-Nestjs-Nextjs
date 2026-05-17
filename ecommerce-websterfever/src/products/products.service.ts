import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  async getProductByIdService(id: string): Promise<Product | string> {
    return await this.productsRepository.getProduct(id);
  }

  createProductService(product: CreateProductDto) {
    return this.productsRepository.createProduct(product);
  }

  async addProducts(): Promise<string> {
    return await this.productsRepository.addProducts();
  }

  updateProductService(id: string, producto: Product) {
    return this.productsRepository.updateProduct(id, producto);
  }

  deleteProductService(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
