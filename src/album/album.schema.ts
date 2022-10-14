import { Painting } from "./../painting/painting.schema";
import { User } from "src/user/user.schema";
import { Prop, raw } from "@nestjs/mongoose";
import mongoose from "mongoose";
import * as moment from "moment";

export class Album {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  creator: User;
  @Prop()
  description: string;
  @Prop()
  albumName: string;
  @Prop()
  albumCoverSrc: string;
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
  createTime: Object;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Painting" }] })
  paintings: Painting[];
}
