import { Injectable, Logger }                                         from "@nestjs/common";
import { InjectModel }                                                from "@nestjs/mongoose";
import { Model }                                                      from "mongoose";
import { ChallengeDto, CreateChallengeDto, UpdateChallengeStatusDto } from "models";

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(@InjectModel("Challenge") private readonly challengeModel: Model<ChallengeDto>) {}

  public async create(dto: CreateChallengeDto): Promise<ChallengeDto> {
    const challenge = new this.challengeModel(dto);
    return await challenge.save();
  }

  public async list(): Promise<ChallengeDto[]> {
    return this.challengeModel.find<ChallengeDto>().populate("matches").exec();
  }

  public async listBy(filter: { playerId: string }): Promise<ChallengeDto[]> {
    return this.challengeModel.find<ChallengeDto>({ playerId: { eq: filter.playerId } }).populate("matches").exec();
  }

  public async get(id: string): Promise<ChallengeDto> {
    return this.challengeModel.findById(id).exec();
  }

  public async update(id: string, challenge: UpdateChallengeStatusDto): Promise<ChallengeDto> {
    return this.challengeModel.findByIdAndUpdate(id, challenge, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await this.challengeModel.findByIdAndDelete(id);
  }
}
