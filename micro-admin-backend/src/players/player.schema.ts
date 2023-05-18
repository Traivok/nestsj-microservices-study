import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument }  from "mongoose";

export type PlayerDocument = HydratedDocument<Player>;

@Schema({
  autoIndex:  true,
  autoCreate: true,
  timestamps: true,
  collection: "players",
  toJSON:     { virtuals: true }
})
export class Player {
  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: string;

  @Prop()
  ranking: string;

  @Prop()
  rankingPosition: number;

  @Prop()
  pictureUrl: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
