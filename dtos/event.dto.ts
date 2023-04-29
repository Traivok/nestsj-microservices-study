import { IsString } from "class-validator";

export class EventDto {
  @IsString() name: string;
  @IsString() operation: string;
  @IsString() value: string;
}
