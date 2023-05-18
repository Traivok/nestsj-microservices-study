import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe
}                                     from "@nestjs/common";
import { ClientProxy }                from "@nestjs/microservices";
import { ClientProxyService }         from "../proxyrmq/client-proxy.service";
import { Observable, switchMap }      from "rxjs";
import { CreatePlayerDto, PlayerDto } from "models";
import { ApiResponse, ApiTags }       from "@nestjs/swagger";

@Controller("players")
@ApiTags("player")
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name);
  private readonly clientAdminBackend: ClientProxy;

  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientAdminBackend = this.clientProxyService.getClientProxyAdminBackendInstance();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPlayer(
    @Body() player: CreatePlayerDto): Observable<PlayerDto> {
    return this.clientAdminBackend.send("find-category", player.category)
      .pipe(switchMap(category => {
          if (category) {
            return this.clientAdminBackend.send("create-player", { player, category });
          } else {
            throw new NotFoundException(`Category Not Found`);
          }
        }
      ));
  }


  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: PlayerDto })
  listPlayers(): Observable<PlayerDto[]> {
    return this.clientAdminBackend.send("list-player", "");
  }

  @Get(":id")
  getPlayer(@Param("id") _id: string): Observable<PlayerDto> {
    return this.clientAdminBackend.send("get-player", _id);
  }

  // @Put(":id")
  // @UsePipes(ValidationPipe)
  // updatePlayer(
  //   @Body() updatePlayerDto: UpdatePlayerDto,
  //   @Param("id") _id: string): Promise<PlayerDto> {
  //
  //   // const category = await this.clientAdminBackend.send("list-category",
  //   //   updatePlayerDto.category).toPromise();
  //
  //   if (category) {
  //     return await this.clientAdminBackend.send("update-player", { id: _id, player: updatePlayerDto });
  //   } else {
  //     throw new BadRequestException(``);
  //   }
  // }

  @Delete(":id")
  deletePlayer(
    @Param("id") _id: string) {
    this.clientAdminBackend.emit("delete-player", { _id });
  }
}
