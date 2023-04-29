import { Controller, Get, Logger } from "@nestjs/common";

import { AppService }            from './app.service';
import { EventPattern, Payload } from "@nestjs/microservices";
import { CreateCategoryDto }     from "../../../dtos/src/lib/create-category.dto";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @EventPattern('create-category')
  async createCategory(@Payload() createCategory: CreateCategoryDto) {
    this.logger.log(createCategory);
    return 'Hello, world';
  }
}
