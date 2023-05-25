import { BadRequestException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel }                                         from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery }                     from "mongoose";
import {
  AssignChallengeMatchDto,
  CategoryDto,
  ChallengeDto,
  ChallengeStatus,
  CreateChallengeDto,
  MatchDto,
  PlayerDto,
  UpdateChallengeStatusDto
}                                                              from "models";
import { RpcException }                                        from "@nestjs/microservices";
import { ChallengeDocument, MatchDocument }                    from "mongo-schemas";

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(@InjectModel("Challenge") private readonly challengeModel: Model<ChallengeDocument>,
              @InjectModel("Match") private readonly matchModel: Model<MatchDocument>) {}

  public async create(challenge: CreateChallengeDto, challenger: PlayerDto, challenged: PlayerDto, category: CategoryDto): Promise<ChallengeDocument> {
    const newChallenge = new this.challengeModel({ ...challenge, challenged, challenger, category });

    return await newChallenge.save();
  }

  public async list(): Promise<ChallengeDocument[]> {
    return this.challengeModel.find<ChallengeDocument>().populate("match").exec();
  }

  public async listBy(filter: { playerId: string }): Promise<ChallengeDocument[]> {
    const filterQuery: FilterQuery<ChallengeDocument> = {
      $or: [
        { challenged: filter.playerId },
        { challenger: filter.playerId }
      ]
    };

    return this.challengeModel.find<ChallengeDocument>(filterQuery).populate("match").exec();
  }

  public async get(id: string, populate = false): Promise<ChallengeDocument> {
    let query = this.challengeModel.findById(id);

    if (populate)
      query = query.populate([ "challenger", "challenged", "match", "category" ]);

    return query.exec();
  }

  public async update(id: string, challenge: UpdateChallengeStatusDto): Promise<ChallengeDocument> {
    let update: UpdateQuery<ChallengeDocument> = challenge;

    if (challenge.status === ChallengeStatus.ACCEPTED)
      update = { ...update, acceptedDate: new Date() };

    return this.challengeModel.findByIdAndUpdate(id, update, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await this.challengeModel.findByIdAndDelete(id);
  }

  public async addMatch(challengeId: string, match: AssignChallengeMatchDto): Promise<ChallengeDocument> {
    const challenge = await this.get(challengeId);

    if (challenge.status === ChallengeStatus.COMPLETED)
      throw new RpcException({ status: HttpStatus.BAD_GATEWAY });

    if (challenge.status !== ChallengeStatus.ACCEPTED)
      throw new RpcException({ status: HttpStatus.BAD_GATEWAY });

    const playersIds = [
      challenge.challenger.toString(),
      challenge.challenger.toString()
    ];

    if (!playersIds.includes(match.winner))
      throw new RpcException({ status: HttpStatus.BAD_GATEWAY });

    const newMath   = new this.matchModel(match);
    challenge.match = ( await newMath.save() ).id;

    return await challenge.save();
  }
}
