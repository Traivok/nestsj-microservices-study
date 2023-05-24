import { Body, Controller, Logger, Param, Put } from "@nestjs/common";
import { ApiTags }                              from "@nestjs/swagger";
import { ClientProxyService }                   from "../proxyrmq/client-proxy.service";
import { AssignChallengeMatchDto, MatchDto }    from "models";
import { Observable }                           from "rxjs";

@Controller("challenges/:challengeId/matches")
@ApiTags("challenges")
export class MatchesController {
  private readonly logger = new Logger(MatchesController.name);

  constructor(private readonly clientProxies: ClientProxyService) {
  }

  @Put()
  addMatchToChallenge(@Param("challengeId") challengeId: string,
                      @Body() dto: AssignChallengeMatchDto): Observable<MatchDto> {
    return this.clientProxies.challengeClient.send("create-match", { challengeId, match: dto });
  }

}
