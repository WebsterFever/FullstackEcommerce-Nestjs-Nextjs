import { Injectable } from '@nestjs/common';
import { Product } from './products.interface';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'iPhone 15',
      description: 'The best smartphone in the world',
      price: 199.99,
      stock: true,
      category: 'smartphone',
      imgUrl:
        'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      description: 'The best smartphone in the world',
      price: 150.0,
      stock: true,
      category: 'smartphone',
      imgUrl:
        'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
    },
    {
      id: 3,
      name: 'Motorola Edge 40',
      description: 'The best smartphone in the world',
      price: 179.89,
      stock: true,
      category: 'smartphone',
      imgUrl:
        'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
    },
    {
      id: 4,
      name: 'Samsung Odyssey G9',
      description: 'The best monitor in the world',
      price: 299.99,
      stock: false,
      category: 'monitor',
      imgUrl:
        'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
    },
    {
      id: 5,
      name: 'LG UltraGear',
      description: 'The best monitor in the world',
      price: 199.99,
      stock: true,
      category: 'monitor',
      imgUrl:
        'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
    },
  ];

  getAllProducts(): Product[] {
    return this.products;
  }
}
