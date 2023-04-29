import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EventDto }                                                from "./event.dto";

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<EventDto>
}
