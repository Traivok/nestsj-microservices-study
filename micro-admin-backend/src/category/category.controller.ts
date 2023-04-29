import { Controller, Logger } from "@nestjs/common";
import { CategoryDto, CreateCategoryDto } from "models";
import { CategoryService }                from "./category.service";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller('')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @EventPattern("create-category")
  async createCategory(@Payload() createCategory: CreateCategoryDto): Promise<CategoryDto> {
    return await this.categoryService.create(createCategory);
  }

  @EventPattern("list-category")
  async listCategory(): Promise<CategoryDto[]> {
    return await this.categoryService.list();
  }

  @EventPattern("get-category")
  async getCategory(@Payload() _id: string): Promise<CategoryDto> {
    return await this.categoryService.get(_id);
  }
}
