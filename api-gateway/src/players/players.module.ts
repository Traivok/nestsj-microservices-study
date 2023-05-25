import { Module }               from "@nestjs/common";
import { PlayerPictureService } from "./player-picture.service";
import { PlayersController }    from "./players.controller";
import { HttpModule }           from "@nestjs/axios";
import { ProxyRMQModule }       from "rmq-proxies";

@Module({
  imports:     [
    ProxyRMQModule,
    HttpModule
  ],
  controllers: [ PlayersController ],
  providers:   [ PlayerPictureService ]
})
export class PlayersModule {}
