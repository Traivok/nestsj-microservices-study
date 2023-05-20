import { Injectable, Logger } from "@nestjs/common";
import {
  InjectModel
}                             from "@nestjs/mongoose";
import {
  FilterQuery,
  Model, UpdateQuery
}                             from "mongoose";
import {
  CategoryDto,
  ChallengeDto,
  ChallengeStatus,
  CreateChallengeDto,
  PlayerDto,
  UpdateChallengeStatusDto
}                             from "models";

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(@InjectModel("Challenge") private readonly challengeModel: Model<ChallengeDto>) {}

  public async create(challenge: CreateChallengeDto, challenger: PlayerDto, challenged: PlayerDto, category: CategoryDto): Promise<ChallengeDto> {
    const newChallenge = new this.challengeModel({ ...challenge, challenged, challenger, category });

    return await newChallenge.save();
  }

  public async list(): Promise<ChallengeDto[]> {
    return this.challengeModel.find<ChallengeDto>().populate("match").exec();
  }

  public async listBy(filter: { playerId: string }): Promise<ChallengeDto[]> {
    const filterQuery: FilterQuery<ChallengeDto> = {
      $or: [
        { challenged: filter.playerId },
        { challenger: filter.playerId }
      ]
    };

    return this.challengeModel.find<ChallengeDto>(filterQuery).populate("match").exec();
  }

  public async get(id: string): Promise<ChallengeDto> {
    return this.challengeModel.findById(id).exec();
  }

  public async update(id: string, challenge: UpdateChallengeStatusDto): Promise<ChallengeDto> {
    let update: UpdateQuery<ChallengeDto> = challenge;

    if (challenge.status === ChallengeStatus.ACCEPTED)
      update = { ...update, acceptedDate: new Date() };

    return this.challengeModel.findByIdAndUpdate(id, update, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await this.challengeModel.findByIdAndDelete(id);
  }
}
