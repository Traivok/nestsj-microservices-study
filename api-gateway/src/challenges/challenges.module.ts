import { Module }               from "@nestjs/common";
import { ChallengesController } from "./challenges.controller";
import { MatchesController }    from "./matches.controller";
import { ProxyRMQModule }       from "../proxyrmq/proxy-rmq.module";

@Module({
  imports:     [
    ProxyRMQModule
  ],
  controllers: [ ChallengesController, MatchesController ]
})
export class ChallengesModule {}
