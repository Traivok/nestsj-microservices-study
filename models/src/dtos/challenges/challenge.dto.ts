import { PlayerDto }                from "../players";
import { CategoryDto }              from "../categories";
import { MatchDto, ResultDto }                          from "./match.dto";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export enum ChallengeStatus {
  COMPLETED = "COMPLETED",
  PENDING   = "PENDING",
  ACCEPTED  = "ACCEPTED",
  DENIED    = "DENIED",
  CANCELED  = "CANCELED"
}


export class ChallengeDto {
  challengeDate!: Date;
  requestDate!: Date;
  acceptDate: Date | null = null;
  challenger!: PlayerDto;
  challenged!: PlayerDto;
  category!: CategoryDto;
  match: MatchDto | null  = null;
  status!: ChallengeStatus;
}

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDate!: Date;

  @IsNotEmpty()
  challenger!: string;

  @IsNotEmpty()
  challenged!: string;

  @IsNotEmpty()
  category!: string;
}


export class AssignChallengeMatchDto {
  @IsNotEmpty()
  def!: PlayerDto;

  @IsNotEmpty()
  result!: Array<ResultDto>;
}

export class UpdateChallengeStatusDto {
  @IsEnum(ChallengeStatus)
  status!: ChallengeStatus;
}
