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
}                                                                                from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags }                                        from "@nestjs/swagger";
import {
  ClientProxyService
}                                                                                from "../proxyrmq/client-proxy.service";
import { ChallengeDto, CreateChallengeDto, PlayerDto, UpdateChallengeStatusDto } from "models";
import { combineLatest, Observable, switchMap }                                  from "rxjs";

@Controller("challenges")
@ApiTags("challenges")
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);

  constructor(private readonly clientProxies: ClientProxyService) {
  }

  @Post()
  createChallenge(@Body() dto: CreateChallengeDto): Observable<ChallengeDto> {
    const challenger$ = this.clientProxies.adminClient.send<PlayerDto>("get-player", dto.challenger);
    const challenged$ = this.clientProxies.adminClient.send<PlayerDto>("get-player", dto.challenged);

    return combineLatest([ challenger$, challenged$ ])
      .pipe(switchMap(([ challenger, challenged ]) => {
        if (!challenger || !challenged)
          throw  new NotFoundException("Player not found");

        if (challenger === challenged)
          throw new BadRequestException("Challenger and Challenged should be distinct");

        if (challenger.category?.id !== challenged.category?.id || challenger.category?.id !== dto.category)
          throw new BadRequestException("Categories does not match");

        return this.clientProxies.challengeClient.send<ChallengeDto, CreateChallengeDto>("create-challenge", dto);
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
