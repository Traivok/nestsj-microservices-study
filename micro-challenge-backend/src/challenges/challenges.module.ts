import { Module }               from "@nestjs/common";
import { ChallengesService }    from "./challenges.service";
import { ChallengesController } from "./challenges.controller";
import { MongooseModule }       from "@nestjs/mongoose";
import { ChallengeSchema }      from "./challenge.schema";
import { MatchSchema }          from "./match.schema";
import { MatchesController }    from "./matches.controller";

// eslint-disable-next-line @nx/enforce-module-boundaries
import { PlayerSchema }         from "../../../micro-admin-backend/src/players/player.schema";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CategorySchema }       from "../../../micro-admin-backend/src/category/category.schema";

@Module({
  imports:     [
    MongooseModule.forFeature([
      { name: "Challenge", schema: ChallengeSchema },
      { name: "Match", schema: MatchSchema },
      { name: "Player", schema: PlayerSchema },
      { name: "Category", schema: CategorySchema }
    ])
  ],
  providers:   [
    ChallengesService
  ],
  controllers: [
    ChallengesController,
    MatchesController
  ]
})
export class ChallengesModule {}
