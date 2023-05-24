import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ResultDto }                  from "models";

export type MatchDocument = HydratedDocument<Match>;

@Schema({
  autoIndex:  true,
  autoCreate: true,
  collection: "matches",
  timestamps: true,
  toJSON:     { virtuals: true }
})
export class Match {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Player" })
  winner: mongoose.Schema.Types.ObjectId;

  @Prop([ { set: String } ])
  results: Array<ResultDto>;
}


export const MatchSchema = SchemaFactory.createForClass(Match);
