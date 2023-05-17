import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
}                                           from "@nestjs/common";
import { ClientProxy }                      from "@nestjs/microservices";
import { ClientProxyService }               from "../proxyrmq/client-proxy.service";
import { Observable }                       from "rxjs";
import { CreatePlayerDto, UpdatePlayerDto } from "models";
import { ApiTags }                          from "@nestjs/swagger";

@Controller("players")
@ApiTags('player')
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name);
  private readonly clientAdminBackend: ClientProxy;

  constructor(private readonly clientProxyService: ClientProxyService) {
    this.clientAdminBackend = this.clientProxyService.getClientProxyAdminBackendInstance();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarPlayer(
    @Body() criarPlayerDto: CreatePlayerDto) {

    this.logger.log(`criarPlayerDto: ${ JSON.stringify(criarPlayerDto) }`);

    const category = await this.clientAdminBackend.send("list-category",
      criarPlayerDto.category).toPromise();

    if (category) {
      await this.clientAdminBackend.emit("create-player", criarPlayerDto);
    } else {
      throw new BadRequestException(`Categoria não cadastrada!`);
    }
  }


  @Get()
  listPlayers(): Observable<any> {
    return this.clientAdminBackend.send("list-players", "");
  }

  @Get(":id")
  getPlayer(@Param("id") _id: string): Observable<any> {
    return this.clientAdminBackend.send("get-players", _id);
  }

  @Put(":id")
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param("id") _id: string) {

    const category = await this.clientAdminBackend.send("list-category",
      updatePlayerDto.category).toPromise();

    if (category) {
      await this.clientAdminBackend.emit("update-player", { id: _id, player: updatePlayerDto });
    } else {
      throw new BadRequestException(``);
    }
  }

  @Delete(":id")
  async deletePlayer(
    @Param("id") _id: string) {
    await this.clientAdminBackend.emit("delete-player", { _id });
  }
}
