import { Module }             from "@nestjs/common";
import { MicroCommonsModule } from "micro-commons";
import { ChallengesModule }   from "../challenges/challenges.module";
import { MatchesModule }      from "../matches/matches.module";

@Module({
  imports:     [
    MicroCommonsModule,
    ChallengesModule,
    MatchesModule
  ],
  controllers: [],
  providers:   []
})
export class AppModule {}
