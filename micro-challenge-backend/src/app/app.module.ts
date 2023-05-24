import { Module }             from "@nestjs/common";
import { MicroCommonsModule } from "micro-commons";
import { ChallengesModule }   from "../challenges/challenges.module";

@Module({
  imports:     [
    MicroCommonsModule,
    ChallengesModule,
  ],
  controllers: [],
  providers:   []
})
export class AppModule {}
