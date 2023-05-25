import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
}                                                                                             from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags }                                                     from "@nestjs/swagger";
import { CategoryDto, ChallengeDto, CreateChallengeDto, PlayerDto, UpdateChallengeStatusDto } from "models";
import { combineLatest, Observable, switchMap }                                               from "rxjs";
import { ClientProxiesService }                                                               from "rmq-proxies";

@Controller("challenges")
@ApiTags("challenges")
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);

  constructor(private readonly clientProxies: ClientProxiesService) {
  }

  @Post()
  createChallenge(@Body() dto: CreateChallengeDto): Observable<ChallengeDto> {
    const challenger$ = this.clientProxies.adminClient.send<PlayerDto>("get-player", dto.challenger);
    const challenged$ = this.clientProxies.adminClient.send<PlayerDto>("get-player", dto.challenged);
    const category$   = this.clientProxies.adminClient.send<CategoryDto>("find-category", dto.category);

    return combineLatest([ challenger$, challenged$, category$ ])
      .pipe(switchMap(([ challenger, challenged, category ]) => {
        if (!challenger || !challenged || !category)
          throw new NotFoundException("Player or Category not found");

        if (challenger.id === challenged.id)
          throw new BadRequestException("Challenger and Challenged should be distinct");

        if (challenger.category?.id !== challenged.category?.id || challenger.category?.id !== category.id)
          throw new BadRequestException("Categories does not match");

        return this.clientProxies.challengeClient.send<ChallengeDto>("create-challenge", {
          dto,
          category,
          challenger,
          challenged
        });
      }));
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ChallengeDto })
  @ApiQuery({ name: "playerId", type: "string", required: false })
  listChallenges(@Query("playerId") playerId?: string): Observable<ChallengeDto[]> {
    if (playerId && !this.clientProxies.adminClient.send<boolean>("check-player", playerId)) {
      throw new NotFoundException("Player not found");
    }

    return this.clientProxies.challengeClient.send<ChallengeDto[]>("list-challenge", playerId ?? "");
  }

  @Get(":id")
  getChallenge(@Param("id") id: string): Observable<ChallengeDto> {
    return this.clientProxies.challengeClient.send<ChallengeDto>("get-challenge", id);
  }

  @Patch(":id")
  updateChallenge(@Param("id") id: string,
                  @Body() dto: UpdateChallengeStatusDto): Observable<ChallengeDto> {
    return this.clientProxies.challengeClient.send<ChallengeDto>("update-challenge", { id, challenge: dto });
  }

  @Delete(":id")
  deleteChallenge(@Param("id") id: string): Observable<void> {
    return this.clientProxies.challengeClient.emit("delete-challenge", id);
  }
}
