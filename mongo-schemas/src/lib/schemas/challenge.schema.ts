import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument }  from "mongoose";
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
  @Prop() challengeDate!: Date;
  @Prop() requestDate!: Date;
  @Prop() acceptDate?: Date;

  @Prop({
    type:     String,
    required: true,
    enum:     ChallengeStatus,
    default:  ChallengeStatus.PENDING
  })
  status!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Player" })
  challenger!: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Player" })
  challenged!: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category!: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Match" })
  match!: mongoose.Schema.Types.ObjectId;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
