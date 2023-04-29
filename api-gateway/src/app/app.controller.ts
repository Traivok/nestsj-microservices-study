import { Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport }                    from "@nestjs/microservices";
import { ConfigService }     from "@nestjs/config";
import { CreateCategoryDto } from "../../../dtos/create-category.dto";
import { ApiResponse }       from "@nestjs/swagger";

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
        urls:  [ rmqUrl ],
        queue: "admin-backend",
        queueOptions: {
          durable: false
        },
      }
    });
  }


  @Post("categories")
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.clientAdminBackend.emit("create-category", createCategoryDto);

  }
}
