/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class FilesUploadRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async updateProductImage(id: string, imgUrl: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    await this.productRepository.update(id, { imgUrl });

    const updatedProduct = await this.productRepository.findOneBy({ id });

    if (!updatedProduct) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return updatedProduct;
  }
}
