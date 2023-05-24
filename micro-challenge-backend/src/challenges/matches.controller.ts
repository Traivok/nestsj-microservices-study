import { Controller }                            from "@nestjs/common";
import { EventPattern, Payload }                 from "@nestjs/microservices";
import { AssignChallengeMatchDto, ChallengeDto } from "models";
import { ChallengesService }                     from "./challenges.service";

@Controller()
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
