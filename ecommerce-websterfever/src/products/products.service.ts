/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getAllProducts(): Product[] {
    return this.productsRepository.getAllProducts();
  }

  getProductByIdService(id: string) {
    return this.productsRepository.getProductById(Number(id));
  }

  createProductService(product) {
    return this.productsRepository.createProduct(product);
  }

  updateProductService(id: string, product) {
    return this.productsRepository.updateProduct(Number(id), product);
  }

  deleteProductService(id: string) {
    return this.productsRepository.deleteProduct(Number(id));
  }
}
