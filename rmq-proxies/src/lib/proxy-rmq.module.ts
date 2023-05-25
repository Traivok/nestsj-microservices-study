import { Module }               from '@nestjs/common';
import { ConfigModule }         from "@nestjs/config";
import { ClientProxiesService } from "./client-proxies.service";

@Module({
  providers: [ClientProxiesService],
  exports: [ClientProxiesService],
  imports:  [ConfigModule]
})
export class ProxyRMQModule {}
