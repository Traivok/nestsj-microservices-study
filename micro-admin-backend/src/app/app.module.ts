import { Module } from "@nestjs/common";

import { MongooseModule }              from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CategoryModule }              from "../category/category.module";
import { PlayersModule }               from "../players/players.module";

@Module({
  imports:     [
    ConfigModule.forRoot({
      expandVariables: true
    }),
    MongooseModule.forRootAsync({
      imports:    [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ( {
        uri:             configService.getOrThrow<string>("MONGODB_URL"),
      } ),
      inject:     [ ConfigService ]
    }),
    CategoryModule,
    PlayersModule,
  ],
  controllers: [],
  providers:   []
})
export class AppModule {}
