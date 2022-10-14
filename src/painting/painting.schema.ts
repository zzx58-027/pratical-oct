import { Album } from "./../album/album.schema";
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/user.schema";

export type PaintingDocument = Painting & Document;

@Schema()
export class Painting {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  creator: User;
  @Prop()
  description: string;
  @Prop()
  paintingName: string;
  @Prop()
  paintingSrc: string;
  //COS/album - Key
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album"}] })
  parentAlbums: Album[];
  @Prop(
    raw({
      //Date.now() 方法返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。
      timestamp: { type: String, default: Date.now(), immutable: true },
      moment: {
        type: String,
        default: moment().format("MMMM Do YYYY, h:mm:ss a"),
        immutable: true,
      },
    })
  )
  paintingCreateTime: Object;
  //likesType
  @Prop(
    raw({
      likeCounts: { type: Number, default: 0 },
      whoLiked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    })
  )
  likes: Object;
  @Prop(
    raw({
      viewCounts: { type: Number, default: 0 },
      visitors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    })
  )
  views: Object;

  @Prop([String])
  paintingLabels: string[];
  // @Prop()
  // comments: commentsType
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
  colletors: User[];
}

export const paintingSchema = SchemaFactory.createForClass(Painting);
