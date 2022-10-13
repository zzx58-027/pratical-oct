import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PaintingDocument = Painting & Document;

@Schema()
export class Painting {
    @Prop()
    creator: string
    @Prop()
    description: string
    @Prop()
    paintingName: string
    @Prop()
    paintingSrc: string
    //COS/album - Key
    @Prop()
    parentAlbums: string
    @Prop()
    createTime: string
    @Prop()
    likes: number
    @Prop()
    views: number
    /* 
    @Prop()
    paintingLabels: string[]
    @Prop()
    comments: commentsType
    */
}

export const paintingSchema = SchemaFactory.createForClass(Painting);