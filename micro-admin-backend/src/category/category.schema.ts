import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument }            from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  autoIndex:  true,
  autoCreate: true,
  collection: "categories",
  timestamps: true,
  toJSON:     { virtuals: true }
})
export class Category {
  @Prop({ unique: true })
  category: string;

  @Prop()
  description: string;

  @Prop([
    {
      name:      Number,
      operation: String,
      value:     Number
    }
  ])
  events: {
    name: string;
    operation: string;
    value: number;
  }[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
