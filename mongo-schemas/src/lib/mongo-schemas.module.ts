import { Module }                                                                          from "@nestjs/common";
import { MongooseModule }                                                                  from "@nestjs/mongoose";
import { CategorySchema, ChallengeSchema, MatchSchema, PlayerPictureSchema, PlayerSchema } from "./schemas";

@Module({
  imports:     [
    MongooseModule.forFeature([
      { name: "Category", schema: CategorySchema },
      { name: "Challenge", schema: ChallengeSchema },
      { name: "Match", schema: MatchSchema },
      { name: "Player", schema: PlayerSchema },
      { name: "PlayerPicture", schema: PlayerPictureSchema }
    ])
  ],
  exports:     [
    MongooseModule
  ]
})
export class MongoSchemasModule {}
