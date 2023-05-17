import { Module }           from "@nestjs/common";
import { ConfigModule }     from "@nestjs/config";
import { CategoriesModule } from "../categories/categories.module";
import { ProxyRMQModule }   from "../proxyrmq/proxy-rmq.module";
import { PlayersModule }    from "../players/players.module";

@Module({
  imports:     [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    ProxyRMQModule,
    CategoriesModule,
    PlayersModule,
  ],
  controllers: [  ],
  providers:   []
})
export class AppModule {}
