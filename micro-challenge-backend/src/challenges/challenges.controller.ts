import { BadRequestException, Controller, Logger, NotFoundException }                  from "@nestjs/common";
import { ChallengesService }                                                           from "./challenges.service";
import { EventPattern, Payload }                                                       from "@nestjs/microservices";
import { ChallengeDto, ChallengeStatus, CreateChallengeDto, UpdateChallengeStatusDto } from "models";

@Controller()
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);

  constructor(private readonly challengeService: ChallengesService) {}

  @EventPattern("create-challenge")
  public async createChallenge(@Payload() dto: CreateChallengeDto): Promise<ChallengeDto> {
    return this.challengeService.create(dto);
  }

  @EventPattern("list-challenge")
  public async listChallenge(@Payload() playerId: string): Promise<ChallengeDto[]> {
    this.logger.log('listing')
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
