import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument }  from "mongoose";
import { Player }                      from "../../../micro-admin-backend/src/players/player.schema";
import { Category }                    from "../../../micro-admin-backend/src/category/category.schema";
import { ChallengeStatus }             from "models";

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
  @Prop() acceptDate?: Date;

  @Prop({
    type:     String,
    required: true,
    enum:     ChallengeStatus
  })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Player" })
  challenger: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Player" })
  challenged: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Match" })
  match: string;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
