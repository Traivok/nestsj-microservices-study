import { CategoryDto } from "../categories";

export class PlayerDto {
  readonly id!: string;
  readonly phoneNumber!: string;
  readonly email!: string;
  category!: CategoryDto;
  name!: string;
  ranking!: string;
  rankingPosition!: number;
  pictureUrl!: string;
}
