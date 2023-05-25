import { Module }               from "@nestjs/common";
import { ChallengesService }    from "./challenges.service";
import { ChallengesController } from "./challenges.controller";
import { MatchesController }    from "./matches.controller";
import { MongoSchemasModule }   from "mongo-schemas";


@Module({
  imports:     [
    MongoSchemasModule,
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
