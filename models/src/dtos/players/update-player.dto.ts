import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePlayerDto {
  @IsNotEmpty()
  @IsOptional()
  readonly phoneNumber?: string;

  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  pictureUrl?: string;
}
