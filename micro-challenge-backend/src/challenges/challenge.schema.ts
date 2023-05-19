import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument }  from "mongoose";
import { Player }                      from "../../../micro-admin-backend/src/players/player.schema";
import { Category }                    from "../../../micro-admin-backend/src/category/category.schema";

export type ChallengeDocument = HydratedDocument<Challenge>;

@Schema({
  autoIndex:  true,
  autoCreate: true,
  collection: "challenges",
  timestamps: true,
  toJSON:     { virtuals: true }
})
export class Challenge {
  @Prop() challengeDate: Date;
  @Prop() requestDate: Date;
  @Prop() acceptedDate: Date;
  @Prop() status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Player" })
  challengerId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: string;

  @Prop([ { type: mongoose.Schema.Types.ObjectId, ref: "Player" } ])
  playerIds: string[];

  @Prop() match;
}

export const ChallengeChallenge = SchemaFactory.createForClass(Challenge);
