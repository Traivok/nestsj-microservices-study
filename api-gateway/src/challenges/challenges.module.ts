import { Module }               from "@nestjs/common";
import { ChallengesController } from "./challenges.controller";
import { ChallengesService } from './challenges.service';
import { MatchesController }    from "./matches.controller";
import { ProxyRMQModule }       from "../proxyrmq/proxy-rmq.module";

@Module({
  imports:     [
    ProxyRMQModule
  ],
  controllers: [ ChallengesController, MatchesController ],
  providers: [ChallengesService]
})
export class ChallengesModule {}
