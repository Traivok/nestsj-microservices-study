import { Controller, Logger, UseFilters } from "@nestjs/common";
import { PlayersService }                 from "./players.service";
import { EventPattern, Payload }                                                      from "@nestjs/microservices";
import { CategoryDto, CreatePlayerDto, PlayerDto, PlayerPictureDto, UpdatePlayerDto } from "models";
import { DuplicateKeyFilter } from "micro-commons";

@Controller()
@UseFilters(DuplicateKeyFilter)
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name);

  constructor(private readonly playerService: PlayersService) {}

  @EventPattern("create-player")
  async createPlayer(@Payload() data: { player: CreatePlayerDto, category: CategoryDto }) {
    return await this.playerService.createPlayer(data.player, data.category);
  }

  @EventPattern("list-player")
  async listPlayers(): Promise<PlayerDto[]> {
    return await this.playerService.listPlayers();
  }

  @EventPattern("get-player")
  async getPlayers(@Payload() _id: string): Promise<PlayerDto> {
    return await this.playerService.getPlayer(_id);
  }

  @EventPattern("update-player")
  async updatePlayer(@Payload() data: { id: string, player: UpdatePlayerDto }) {
    return await this.playerService.updatePlayer(data.id, data.player);
  }

  @EventPattern("check-player")
  async playerExists(@Payload() _id: string): Promise<boolean> {
    return await this.playerService.exists(_id);
  }

  @EventPattern("update_pic-player")
  async updatePlayerPicture(@Payload() payload: { id: string, picture: PlayerPictureDto }): Promise<PlayerDto> {
    return await this.playerService.uploadPicture(payload.id, payload.picture);
  }

  @EventPattern("delete-player")
  async deletePlayer(@Payload() _id: string) {
    await this.playerService.deletePlayer(_id);

  }

}
