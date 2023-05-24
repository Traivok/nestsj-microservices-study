import { PlayerDto } from "../players";

export class MatchDto {
  winner!: PlayerDto;
  results: Array<ResultDto> = [];
}

export interface ResultDto {
  set: string;
}

