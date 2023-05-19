import { Controller, Logger } from "@nestjs/common";
import { ClientProxy }        from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { ClientProxyService } from "../proxyrmq/client-proxy.service";

@Controller('challenges/:id/matches')
@ApiTags('challenges')
export class MatchesController {
  private readonly logger = new Logger(MatchesController.name);
  private readonly clientChallengeBackend: ClientProxy;

  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientChallengeBackend = this.clientProxyService.createClientProxyChallengeBackend();
  }

}
