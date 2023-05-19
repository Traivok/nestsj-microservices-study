import { Module }              from "@nestjs/common";
import { PlayersController }   from "./players.controller";
import { PlayersService }      from "./players.service";
import { MongooseModule }      from "@nestjs/mongoose";
import { CategorySchema }      from "../category/category.schema";
import { PlayerSchema }        from "./player.schema";
import { PlayerPictureSchema } from "./player-picture.schema";

@Module({
  imports:     [
    MongooseModule.forFeature([
      { name: "Category", schema: CategorySchema },
      { name: "Player", schema: PlayerSchema },
      { name: "PlayerPicture", schema: PlayerPictureSchema }
    ]) ],
  controllers: [ PlayersController ],
  providers:   [ PlayersService ]
})
export class PlayersModule {}
