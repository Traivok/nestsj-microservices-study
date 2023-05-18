import { Injectable, Logger }                          from "@nestjs/common";
import { InjectModel }                                 from "@nestjs/mongoose";
import { Model }                                                    from "mongoose";
import { CategoryDto, CreatePlayerDto, PlayerDto, UpdatePlayerDto } from "models";
import { RpcException }                                             from "@nestjs/microservices";

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel("Player") private readonly playerModel: Model<PlayerDto>
  ) {}


  async createPlayer(player: CreatePlayerDto, category: CategoryDto): Promise<PlayerDto> {
    try {
      const newPlayer = new this.playerModel({ ...player, category});
      return await newPlayer.save();
    } catch (error) {
      this.logger.error(`error: ${ JSON.stringify(error.message) }`);
      throw new RpcException(error.message);
    }
  }

  async listPlayers(): Promise<PlayerDto[]> {
    try {
      return await this.playerModel.find().populate("category").exec();
    } catch (error) {
      this.logger.error(`error: ${ JSON.stringify(error.message) }`);
      throw new RpcException(error.message);
    }
  }

  async getPlayer(_id: string): Promise<PlayerDto> {
    try {
      return await this.playerModel.findById(_id).populate("category").exec();
    } catch (error) {
      this.logger.error(`error: ${ JSON.stringify(error.message) }`);
      throw new RpcException(error.message);
    }
  }

  async updatePlayer(_id: string, player: UpdatePlayerDto): Promise<void> {
    try {
      await this.playerModel.findOneAndUpdate({ _id },
        player, { new: true }).exec();
    } catch (error) {
      this.logger.error(`error: ${ JSON.stringify(error.message) }`);
      throw new RpcException(error.message);
    }
  }

  async deletePlayer(_id: string): Promise<void> {
    try {
      await this.playerModel.findByIdAndDelete(_id);
    } catch (error) {
      this.logger.error(`error: ${ JSON.stringify(error.message) }`);
      throw new RpcException(error.message);
    }
  }

}
