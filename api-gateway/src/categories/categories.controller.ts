import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post } from "@nestjs/common";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto }                     from "models";
import { Observable }                                                            from "rxjs";
import { ApiResponse, ApiTags }                                                  from "@nestjs/swagger";
import { ClientProxiesService }                                                  from "rmq-proxies";

@Controller("categories")
@ApiTags("category")
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);

  constructor(private readonly clientProxies: ClientProxiesService) {}

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Observable<CategoryDto> {
    return this.clientProxies.adminClient.send("create-category", createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: CategoryDto })
  listCategories(): Observable<CategoryDto[]> {
    this.logger.log("listing");
    return this.clientProxies.adminClient.send<CategoryDto[], Record<string, never>>("list-category", {});
  }

  @Get(":id")
  getCategory(@Param("id") id: string): Observable<CategoryDto> {
    return this.clientProxies.adminClient.send("get-category", id);
  }

  @Patch(":id")
  updateCategory(@Param("id") id: string,
                 @Body() dto: UpdateCategoryDto): Observable<CategoryDto> {
    return this.clientProxies.adminClient.send("update-category", { id, data: dto });
  }

  @Delete(":id")
  deleteCategory(@Param("id") id: string): Observable<void> {
    return this.clientProxies.adminClient.emit("delete-category", id);
  }

}
