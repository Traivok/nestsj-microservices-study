import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  NotImplementedException,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import { ClientProxy }                                                           from "@nestjs/microservices";
import { ApiResponse, ApiTags }                                                  from "@nestjs/swagger";
import {
  ClientProxyService
}                                                                     from "../proxyrmq/client-proxy.service";
import { ChallengeDto, CreateChallengeDto, UpdateChallengeStatusDto } from "models";
import { Observable }                                                 from "rxjs";

@Controller("challenges")
@ApiTags("challenges")
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);
  private readonly clientChallengeBackend: ClientProxy;

  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientChallengeBackend = this.clientProxyService.createClientProxyChallengeBackend();
  }

  @Post()
  createChallenge(@Body() createChallengeDto: CreateChallengeDto): Observable<ChallengeDto> {
    throw new NotImplementedException()
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ChallengeDto })
  listChallenges(): Observable<ChallengeDto[]> {
    throw new NotImplementedException()
  }

  @Get(":id")
  getChallenge(@Param("id") id: string): Observable<ChallengeDto> {
    throw new NotImplementedException()
  }

  @Patch(":id")
  updateChallenge(@Param("id") id: string,
                 @Body() dto: UpdateChallengeStatusDto): Observable<ChallengeDto> {
    throw new NotImplementedException()
  }

  @Delete(":id")
  deleteChallenge(@Param("id") id: string): Observable<void> {
    throw new NotImplementedException()
  }
}
