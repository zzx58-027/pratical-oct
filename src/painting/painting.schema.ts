import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/user.schema";

export type PaintingDocument = Painting & Document;

@Schema()
export class Painting {
  @Prop()
  creator: string;
  @Prop()
  description: string;
  @Prop()
  paintingName: string;
  @Prop()
  paintingSrc: string;
  //COS/album - Key
  @Prop({ type: String, default: "defaultAlbum" })
  parentAlbums: string;
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
  @Prop()
  likes: number;
  @Prop()
  views: number;

  @Prop([String])
  paintingLabels: string[];
  // @Prop()
  // comments: commentsType
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
  colletors: User[];
}

export const paintingSchema = SchemaFactory.createForClass(Painting);
