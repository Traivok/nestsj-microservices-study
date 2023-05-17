import { Module }             from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { ProxyRMQModule }     from "../proxyrmq/proxy-rmq.module";

@Module({
  controllers: [CategoryController],
  imports: [ProxyRMQModule],
})
export class CategoriesModule {}
