import { Controller, Logger }                                       from "@nestjs/common";
import { PlayersService }                                           from "./players.service";
import { EventPattern, Payload }                                    from "@nestjs/microservices";
import { CategoryDto, CreatePlayerDto, PlayerDto, UpdatePlayerDto } from "models";

@Controller("players")
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
    await this.playerService.updatePlayer(data.id, data.player);
  }

  @EventPattern("delete-player")
  async deletePlayer(@Payload() _id: string) {
    await this.playerService.deletePlayer(_id);

  }

}