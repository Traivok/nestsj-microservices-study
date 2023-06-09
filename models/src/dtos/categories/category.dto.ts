import { ApiProperty } from "@nestjs/swagger";
import { EventDto }    from "../event.dto";

export class CategoryDto {
  readonly id!: string;
  readonly category!: string;
  description!: string;

  @ApiProperty({ isArray: true, type: EventDto })
  events!: Array<EventDto>
}
