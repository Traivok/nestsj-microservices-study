import { Module }                      from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule }              from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true
    }),
    MongooseModule.forRootAsync({
      imports:    [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ( {
        uri: configService.getOrThrow<string>("MONGODB_URL")
      } ),
      inject:     [ ConfigService ]
    })
  ],
  exports: []
})
export class MicroCommonsModule {}
