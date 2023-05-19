import { PlayerDto } from "../players";

export class MatchDto {
  def!: PlayerDto;
  results: Array<ResultDto> = [];
}

export interface ResultDto {
  set: string;
}

