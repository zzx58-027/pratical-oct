import { EncryptService } from "./../auth/encrypt/encrypt.service";
import { User, userSchema } from "./user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [UserController],
  providers: [UserService, EncryptService],
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
})
export class UserModule {}
