import { Module } from '@nestjs/common';
import { ProxyRMQModule }    from "../proxyrmq/proxy-rmq.module";
import { PlayersController } from './players.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [PlayersController],
})
export class PlayersModule {}
