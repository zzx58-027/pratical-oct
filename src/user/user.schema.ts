import { Date, Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
    @Prop()
    projectName: "pratical-oct"
    @Prop()
    userAccountName: string
    @Prop()
    userName: string
    @Prop()
    password: string
    @Prop()
    userAvatarSrc: string
    // @Prop()
    createTime: {
        type: Date,
        default: Date
    }
}

export const userSchema = SchemaFactory.createForClass(User);