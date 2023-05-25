import { Module }             from "@nestjs/common";
import { CategoryService }    from "./category.service";
import { CategoryController } from "./category.controller";
import { MongoSchemasModule } from "mongo-schemas";

@Module({
  imports:     [
    MongoSchemasModule
  ],
  providers:   [ CategoryService ],
  controllers: [ CategoryController ]
})
export class CategoryModule {}
