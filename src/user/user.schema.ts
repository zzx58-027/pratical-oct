import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({default: "pratical-oct"})
    projectName: string
    @Prop()
    userAccountName: string
    @Prop()
    userName: string
    @Prop()
    password: string
    @Prop()
    userAvatarSrc: string
    @Prop({type: String, default: Date.now()})
    userRecentLogin: number
    @Prop({type: Number, default: Date.now()})
    userCreateTime: number
}

export const userSchema = SchemaFactory.createForClass(User);