import { Module }               from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { ProxyRMQModule }       from "rmq-proxies";

@Module({
  controllers: [ CategoriesController ],
  imports:     [ ProxyRMQModule ]
})
export class CategoriesModule {}
