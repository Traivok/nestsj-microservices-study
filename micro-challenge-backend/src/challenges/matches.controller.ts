import { Controller, UseFilters } from "@nestjs/common";
import { EventPattern, Payload }  from "@nestjs/microservices";
import { AssignChallengeMatchDto, ChallengeDto } from "models";
import { ChallengesService }  from "./challenges.service";
import { DuplicateKeyFilter } from "micro-commons";

@Controller()
@UseFilters(DuplicateKeyFilter)
export class MatchesController {
  constructor(private readonly challengeService: ChallengesService) {}

  @EventPattern("create-match")
  async createMatch(@Payload() payload: {
    challengeId: string,
    match: AssignChallengeMatchDto
  }): Promise<ChallengeDto> {
    return (await this.challengeService.addMatch(payload.challengeId, payload.match)).toJSON()
  }

}
