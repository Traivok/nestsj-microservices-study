import { Controller, Logger }                                from "@nestjs/common";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "models";
import { CategoryService }                       from "./category.service";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller("")
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

  @EventPattern("find-category")
  async findCategory(@Payload() category: string): Promise<CategoryDto> {
    return await this.categoryService.findByCategory(category);
  }

  @EventPattern("get-category")
  async getCategory(@Payload() id: string): Promise<CategoryDto> {
    return await this.categoryService.get(id);
  }

  @EventPattern("update-category")
  async updateCategory(@Payload() payload: { id: string, data: UpdateCategoryDto }): Promise<CategoryDto> {
    return await this.categoryService.update(payload.id, payload.data);
  }

  @EventPattern("delete-category")
  async deleteCategory(@Payload() id: string): Promise<void> {
    await this.categoryService.delete(id);
  }
}
