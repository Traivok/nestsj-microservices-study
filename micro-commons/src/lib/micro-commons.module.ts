import { Module }                      from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule }              from "@nestjs/mongoose";
import { DuplicateKeyFilter }          from "./duplicate-key.filter";

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
  providers: [ DuplicateKeyFilter ]
})
export class MicroCommonsModule {}
