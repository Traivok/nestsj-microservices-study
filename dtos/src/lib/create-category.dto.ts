import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { EventDto }                                                    from "./event.dto";
import { ApiProperty }                                                 from "@nestjs/swagger";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly category!: string;


  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ isArray: true, type: EventDto })
  @IsArray()
  @ArrayMinSize(1)
  events!: Array<EventDto>
}



