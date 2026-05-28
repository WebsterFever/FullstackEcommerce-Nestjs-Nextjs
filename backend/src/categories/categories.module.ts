import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CategoriesRepository } from './categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Add your Category entity here
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
