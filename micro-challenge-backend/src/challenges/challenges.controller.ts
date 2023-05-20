import { BadRequestException, Controller, Logger, NotFoundException } from "@nestjs/common";
import { ChallengesService }                                          from "./challenges.service";
import { EventPattern, Payload }                                      from "@nestjs/microservices";
import {
  CategoryDto,
  ChallengeDto,
  ChallengeStatus,
  CreateChallengeDto,
  PlayerDto,
  UpdateChallengeStatusDto
}                                                                     from "models";

interface CreateChallengePayload {
  dto: CreateChallengeDto,
  category: CategoryDto,
  challenger: PlayerDto,
  challenged: PlayerDto,
}

@Controller()
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);

  constructor(private readonly challengeService: ChallengesService) {}

  @EventPattern("create-challenge")
  public async createChallenge(@Payload() payload: CreateChallengePayload): Promise<ChallengeDto> {
    return this.challengeService.create(payload.dto, payload.challenger, payload.challenged, payload.category);
  }

  @EventPattern("list-challenge")
  public async listChallenge(@Payload() playerId: string): Promise<ChallengeDto[]> {
    if (typeof playerId === "string" && playerId !== "")
      return this.challengeService.listBy({ playerId });

    return this.challengeService.list();
  }

  @EventPattern("update-challenge")
  public async updateChallenge(@Payload() payload: {
    challenge: UpdateChallengeStatusDto,
    id: string
  }): Promise<ChallengeDto> {
    const challenge: ChallengeDto = await this.challengeService.get(payload.id);

    if (challenge === null)
      throw new NotFoundException();

    if (challenge.status !== ChallengeStatus.PENDING)
      throw new BadRequestException("Challenge must be pending");

    return this.challengeService.update(payload.id, payload.challenge);
  }

  @EventPattern("delete-challenge")
  public async deleteChallenge(@Payload() id: string): Promise<void> {
    const challenge: ChallengeDto = await this.challengeService.get(id);

    if (challenge === null)
      throw new NotFoundException();

    return this.challengeService.delete(id);
  }

}
