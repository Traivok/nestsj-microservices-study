import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument }            from "mongoose";
import { ImageDetails }                from "models";

export type PlayerPictureDocument = HydratedDocument<PlayerPicture>;

const ImageDetailProp = {
  filename:  String,
  name:      String,
  mime:      String,
  extension: String,
  url:       String
};


@Schema({
  autoIndex:  true,
  autoCreate: true,
  timestamps: true,
  collection: "player-picture",
  toJSON:     { virtuals: true }
})
export class PlayerPicture {
  @Prop() id!: string;
  @Prop() title!: string;
  @Prop() url_viewer!: string;
  @Prop() url!: string;
  @Prop() display_url!: string;
  @Prop() width!: string;
  @Prop() height!: string;
  @Prop() size!: string;
  @Prop() time!: string;
  @Prop() expiration!: string;
  @Prop({ type: ImageDetailProp }) image!: ImageDetails;
  @Prop({ type: ImageDetailProp }) thumb!: ImageDetails;
  @Prop({ type: ImageDetailProp }) medium!: ImageDetails;
  @Prop() delete_url!: string;
  @Prop() success!: boolean;
  @Prop() status!: number;
}

export const PlayerPictureSchema = SchemaFactory.createForClass(PlayerPicture);
