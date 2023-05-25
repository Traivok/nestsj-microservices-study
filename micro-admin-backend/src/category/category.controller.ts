import { Controller, Logger, UseFilters }                    from "@nestjs/common";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "models";
import { CategoryService }                       from "./category.service";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { DuplicateKeyFilter }                                from "micro-commons";

@Controller()
@UseFilters(DuplicateKeyFilter)
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern("create-category")
  async createCategory(@Payload() createCategory: CreateCategoryDto): Promise<CategoryDto> {
    return await this.categoryService.create(createCategory);
  }

  @MessagePattern("list-category")
  async listCategory(): Promise<CategoryDto[]> {
    return await this.categoryService.list();
  }

  @MessagePattern("find-category")
  async findCategory(@Payload() category: string): Promise<CategoryDto> {
    return await this.categoryService.findByCategory(category);
  }

  @MessagePattern("get-category")
  async getCategory(@Payload() id: string): Promise<CategoryDto> {
    return await this.categoryService.get(id);
  }

  @MessagePattern("update-category")
  async updateCategory(@Payload() payload: { id: string, data: UpdateCategoryDto }): Promise<CategoryDto> {
    return await this.categoryService.update(payload.id, payload.data);
  }

  @EventPattern("delete-category")
  async deleteCategory(@Payload() id: string): Promise<void> {
    await this.categoryService.delete(id);
  }
}
