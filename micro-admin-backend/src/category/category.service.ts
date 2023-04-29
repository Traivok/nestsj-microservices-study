import { Injectable, Logger }             from '@nestjs/common';
import { CategoryDto, CreateCategoryDto } from "models";
import { InjectModel }                    from "@nestjs/mongoose";
import { Model }       from "mongoose";

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(@InjectModel('Category') private readonly categoryModel: Model<CategoryDto>) {}

  async get(_id: string): Promise<CategoryDto> {
    return this.categoryModel.findById<CategoryDto>(_id).exec();
  }

  async list(): Promise<CategoryDto[]> {
    return this.categoryModel.find<CategoryDto>().exec();
  }

  async create(dto: CreateCategoryDto): Promise<CategoryDto> {
    this.logger.log(dto);
    const category = new this.categoryModel(dto);
    this.logger.log(category);
    return await category.save();
  }
}
