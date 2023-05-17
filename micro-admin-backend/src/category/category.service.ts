import { Injectable, Logger }                                from "@nestjs/common";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "models";
import { InjectModel }                                       from "@nestjs/mongoose";
import { Model }                          from "mongoose";

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(@InjectModel("Category") private readonly categoryModel: Model<CategoryDto>) {}

  async get(id: string): Promise<CategoryDto> {
    return this.categoryModel.findById<CategoryDto>(id).exec();
  }

  async list(): Promise<CategoryDto[]> {
    return this.categoryModel.find<CategoryDto>().exec();
  }

  async create(dto: CreateCategoryDto): Promise<CategoryDto> {
    const category = new this.categoryModel(dto);
    return await category.save();
  }

  async delete(id: string): Promise<void> {
    this.categoryModel.findByIdAndDelete(id);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryDto> {
    return this.categoryModel.findByIdAndUpdate(id, dto);
  }
}
