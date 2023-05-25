import { Module }           from "@nestjs/common";
import { ConfigModule }     from "@nestjs/config";
import { CategoriesModule } from "../categories/categories.module";
import { PlayersModule }    from "../players/players.module";
import { ChallengesModule } from "../challenges/challenges.module";
import { ProxyRMQModule }   from "rmq-proxies";

@Module({
  imports:     [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath:     [ ".env", ".env.secrets" ]
    }),
    ProxyRMQModule,
    CategoriesModule,
    PlayersModule,
    ChallengesModule,
  ],
  controllers: [],
  providers:   []
})
export class AppModule {}
