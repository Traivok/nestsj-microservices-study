import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument }            from "mongoose";
import { Player }                      from "../../../micro-admin-backend/src/players/player.schema";
import { Category }                    from "../../../micro-admin-backend/src/category/category.schema";

export type MatchDocument = HydratedDocument<Match>;

@Schema({
  autoIndex:  true,
  autoCreate: true,
  collection: "matches",
  timestamps: true,
  toJSON:     { virtuals: true }
})
export class Match {
  // @Prop()
  // categoria: string;

  // @Prop()
  // desafio: string;

  // @Prop()
  // jogadores: string[];

  @Prop()
  def: string;

  @Prop([ { set: String } ])
  results: Array<Result>;
}

export interface Result {
  set: string;
}


export const MatchMatch = SchemaFactory.createForClass(Match);
