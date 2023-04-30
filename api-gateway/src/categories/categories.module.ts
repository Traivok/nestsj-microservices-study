import { Module } from '@nestjs/common';
import { CategoryController } from './category/category.controller';

@Module({
  controllers: [CategoryController]
})
export class CategoriesModule {}
