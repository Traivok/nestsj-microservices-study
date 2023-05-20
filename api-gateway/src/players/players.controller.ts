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
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe
}                                                     from "@nestjs/common";
import { ClientProxy }                                from "@nestjs/microservices";
import { ClientProxyService }                         from "../proxyrmq/client-proxy.service";
import { Observable, switchMap }                      from "rxjs";
import { CreatePlayerDto, PlayerDto }                 from "models";
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor }                            from "@nestjs/platform-express";
import { Express }                                    from "express";
import { PlayerPictureService }                       from "./player-picture.service";

@Controller("players")
@ApiTags("player")
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name);

  constructor(private readonly clientProxies: ClientProxyService,
              private readonly playerPicService: PlayerPictureService) {
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPlayer(
    @Body() player: CreatePlayerDto): Observable<PlayerDto> {
    return this.clientProxies.adminClient.send("find-category", player.category)
      .pipe(switchMap(category => {
          if (category) {
            return this.clientProxies.adminClient.send("create-player", { player, category });
          } else {
            throw new NotFoundException(`Category Not Found`);
          }
        }
      ));
  }


  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: PlayerDto })
  listPlayers(): Observable<PlayerDto[]> {
    return this.clientProxies.adminClient.send("list-player", "");
  }

  @Get(":id")
  getPlayer(@Param("id") id: string): Observable<PlayerDto> {
    return this.clientProxies.adminClient.send("get-player", id);
  }

  @Delete(":id")
  deletePlayer(
    @Param("id") _id: string) {
    this.clientProxies.adminClient.emit("delete-player", { _id });
  }

  @Put(":id/picture")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type:       "object",
      properties: {
        file: {
          type:   "string",
          format: "binary"
        }
      }
    }
  })
  uploadPlayerPicture(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File): Observable<PlayerDto> {

    if (!file.mimetype.startsWith("image"))
      throw new BadRequestException("Picture should be an image");

    // TODO retrieve player and delete old pic
    return this.clientProxies.adminClient.send<boolean>("check-player", id)
      .pipe(
        switchMap(exists => {
          if (!exists)
            throw new NotFoundException();

          return this.playerPicService.uploadProfilePic(file, id);
        }),
        switchMap(picture => {
          return this.clientProxies.adminClient.send<PlayerDto>("update_pic-player", { picture, id });
        })
      );
  }

}
