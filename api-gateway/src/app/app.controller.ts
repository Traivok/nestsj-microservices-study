import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService }                              from "@nestjs/config";
import { Observable }                                 from "rxjs";
import { ApiResponse }                    from "@nestjs/swagger";
import { CategoryDto, CreateCategoryDto } from "models";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor(private readonly config: ConfigService) {
    const rmqUrl = this.config.getOrThrow("RMQ_URL");
    this.logger.log(rmqUrl);
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:   {
        urls:         [ rmqUrl ],
        queue:        "admin-backend",
        queueOptions: {
          durable: false
        }
      }
    });
  }


  @Post("categories")
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Observable<CategoryDto> {
    return this.clientAdminBackend.emit("create-category", createCategoryDto);
  }

  @Get("categories")
  @ApiResponse({ isArray: true, type: CategoryDto})
  listCategories(): Observable<CategoryDto[]> {
    return this.clientAdminBackend.send<CategoryDto[], {}>("list-category", {});
  }


  @Get("categories/:id")
  getCategory(@Param("id") id: string): Observable<CategoryDto> {
    return this.clientAdminBackend.send("get-category", id);
  }
}
