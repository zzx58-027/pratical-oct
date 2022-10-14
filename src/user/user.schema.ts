import { Album } from "./../album/album.schema";
import mongoose from "mongoose";
import { Painting } from "./../painting/painting.schema";
import { Document } from "mongoose";
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: "pratical-oct", immutable: true })
  projectName: string;
  @Prop()
  userAccountName: string;
  @Prop()
  userName: string;
  @Prop()
  password: string;
  @Prop()
  userAvatarSrc: string;
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
  userCreateTime: Object;
  @Prop(
    raw({
      timestamp: { type: String, default: Date.now() },
      moment: {
        type: String,
        default: moment().format("MMMM Do YYYY, h:mm:ss a"),
      },
    })
  )
  userRecentLogin: Object;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
  })
  albums: Album[];

  // @Prop()
  // colletedAlbum:
}

export const userSchema = SchemaFactory.createForClass(User);
