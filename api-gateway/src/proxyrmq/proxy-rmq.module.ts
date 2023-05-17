import { Module }             from "@nestjs/common";
import { ClientProxyService } from "./client-proxy.service";
import { ConfigModule }       from "@nestjs/config";

@Module({
  providers: [ClientProxyService],
  exports: [ClientProxyService],
  imports:  [ConfigModule]
})
export class ProxyRMQModule {}
