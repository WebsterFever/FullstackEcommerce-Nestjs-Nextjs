import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // 🔥 Seed categories (better as POST, not GET)
  @Post('seed')
  addCategories() {
    return this.categoriesService.addCategories();
  }

  // ✅ Get all categories
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
