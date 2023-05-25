import { Body, Controller, Logger, Param, Put } from "@nestjs/common";
import { ApiTags }                              from "@nestjs/swagger";
import { AssignChallengeMatchDto, MatchDto }    from "models";
import { Observable }                           from "rxjs";
import { ClientProxiesService }                 from "rmq-proxies";

@Controller("challenges/:challengeId/matches")
@ApiTags("challenges")
export class MatchesController {
  private readonly logger = new Logger(MatchesController.name);

  constructor(private readonly clientProxies: ClientProxiesService) {
  }

  @Put()
  addMatchToChallenge(@Param("challengeId") challengeId: string,
                      @Body() dto: AssignChallengeMatchDto): Observable<MatchDto> {
    return this.clientProxies.challengeClient.send("create-match", { challengeId, match: dto });
  }

}
