import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from "@nestjs/common";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto }         from "models";
import { Observable }           from "rxjs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxyService }   from "../proxyrmq/client-proxy.service";
import { ClientProxy }                                       from "@nestjs/microservices";

@Controller('categories')
@ApiTags('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  private readonly clientAdminBackend: ClientProxy

  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientAdminBackend = this.clientProxyService.getClientProxyAdminBackendInstance();
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Observable<CategoryDto> {
    return this.clientAdminBackend.send("create-category", createCategoryDto);
  }

  @Get()
  @ApiResponse({ isArray: true, type: CategoryDto })
  listCategories(): Observable<CategoryDto[]> {
    this.logger.log('listing')
    return this.clientAdminBackend.send<CategoryDto[], Record<string, never>>("list-category", {});
  }

  @Get(":id")
  getCategory(@Param("id") id: string): Observable<CategoryDto> {
    return this.clientAdminBackend.send("get-category", id);
  }

  @Patch(":id")
  updateCategory(@Param("id") id: string,
                 @Body() dto: UpdateCategoryDto): Observable<CategoryDto> {
    return this.clientAdminBackend.send("update-category", { id, data: dto });
  }

  @Delete(":id")
  deleteCategory(@Param("id") id: string): Observable<void> {
    return this.clientAdminBackend.emit("delete-category", id);
  }

}
