import { Module }               from "@nestjs/common";
import { ChallengesController } from "./challenges.controller";
import { MatchesController }    from "./matches.controller";
import { ProxyRMQModule }       from "rmq-proxies";

@Module({
  imports:     [
    ProxyRMQModule
  ],
  controllers: [
    ChallengesController,
    MatchesController
  ],
  providers:   []
})
export class ChallengesModule {}
