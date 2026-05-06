import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  async getProduct(id: string): Promise<Product | string> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      return `Producto con id ${id} no encontrado`;
    }

    return product;
  }

  async addProducts(): Promise<string> {
    const categories = await this.categoriesRepository.find();

    await Promise.all(
      data?.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );

        if (!category) return 'Category not found';

        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        // product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }) ?? [],
    );
    return 'Products added successfully';
  }

  async updateProduct(id: string, product: Product) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) return 'Product is not found';

    await this.productsRepository.remove(product);

    return 'Product is removed successfully';
  }
}
