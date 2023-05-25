import { Module }             from "@nestjs/common";
import { PlayersController }  from "./players.controller";
import { PlayersService }     from "./players.service";
import { MongoSchemasModule } from "mongo-schemas";

@Module({
  imports:     [
    MongoSchemasModule
  ],
  controllers: [ PlayersController ],
  providers:   [ PlayersService ]
})
export class PlayersModule {}
