import { Controller, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ClientProxyService } from "../proxyrmq/client-proxy.service";

@Controller('challenges/:id/matches')
@ApiTags('challenges')
export class MatchesController {
  private readonly logger = new Logger(MatchesController.name);

  constructor(private readonly clientProxies: ClientProxyService) {
  }

}
