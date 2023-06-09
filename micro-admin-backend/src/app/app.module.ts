import { Module }             from "@nestjs/common";
import { CategoryModule }     from "../category/category.module";
import { PlayersModule }      from "../players/players.module";
import { MicroCommonsModule } from "micro-commons";

@Module({
  imports:     [
    MicroCommonsModule,
    CategoryModule,
    PlayersModule,
  ],
  controllers: [],
  providers:   []
})
export class AppModule {}
