import { Module }                      from "@nestjs/common";
import { PlayerPictureService } from './player-picture.service';
import { ProxyRMQModule }              from "../proxyrmq/proxy-rmq.module";
import { PlayersController }           from "./players.controller";
import { HttpModule }                  from "@nestjs/axios";
import { ConfigService }               from "@nestjs/config";

@Module({
  imports:     [
    ProxyRMQModule,
    HttpModule,
  ],
  controllers: [ PlayersController ],
  providers: [PlayerPictureService]
})
export class PlayersModule {}
