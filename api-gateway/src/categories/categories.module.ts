import { Module }               from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { ProxyRMQModule }       from "../proxyrmq/proxy-rmq.module";

@Module({
  controllers: [CategoriesController],
  imports: [ProxyRMQModule],
})
export class CategoriesModule {}
