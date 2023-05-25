import { Controller, HttpStatus, Logger, NotFoundException, UseFilters } from "@nestjs/common";
import {
  ChallengesService
}                                                                        from "./challenges.service";
import {
  EventPattern,
  Payload,
  RpcException
}                                                                        from "@nestjs/microservices";
import {
  CategoryDto,
  ChallengeDto,
  ChallengeStatus,
  CreateChallengeDto,
  PlayerDto,
  UpdateChallengeStatusDto
} from "models";
import {
  DuplicateKeyFilter
} from "micro-commons";

interface CreateChallengePayload {
  dto: CreateChallengeDto,
  category: CategoryDto,
  challenger: PlayerDto,
  challenged: PlayerDto,
}

@Controller()
@UseFilters(DuplicateKeyFilter)
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);

  constructor(private readonly challengeService: ChallengesService) {}

  @EventPattern("create-challenge")
  public async createChallenge(@Payload() payload: CreateChallengePayload): Promise<ChallengeDto> {
    const challenge = await this.challengeService.create(payload.dto, payload.challenger, payload.challenged, payload.category);
    return challenge.toJSON();
  }

  @EventPattern("list-challenge")
  public async listChallenge(@Payload() playerId: string): Promise<ChallengeDto[]> {
    const docs = typeof playerId === "string" && playerId !== "" ?
                 await this.challengeService.listBy({ playerId }) :
                 await this.challengeService.list();

    return docs.map(doc => doc.toJSON());
  }

  @EventPattern("get-challenge")
  public async getChallenge(@Payload() id: string): Promise<ChallengeDto> {
    return ( await this.challengeService.get(id, true) ).toJSON();
  }

  @EventPattern("update-challenge")
  public async updateChallenge(@Payload() payload: {
    challenge: UpdateChallengeStatusDto,
    id: string
  }): Promise<ChallengeDto> {
    const challenge = await this.challengeService.get(payload.id);

    if (challenge === null)
      throw new NotFoundException();

    if (challenge.status !== ChallengeStatus.PENDING)
      throw new RpcException({ status: HttpStatus.BAD_GATEWAY });

    return ( await this.challengeService.update(payload.id, payload.challenge) ).toJSON();
  }

  @EventPattern("delete-challenge")
  public async deleteChallenge(@Payload() id: string): Promise<void> {
    const challenge = await this.challengeService.get(id);

    if (challenge === null)
      throw new RpcException({ status: HttpStatus.NOT_FOUND });

    return this.challengeService.delete(id);
  }

}
