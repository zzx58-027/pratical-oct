import { User, userSchema } from './../user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema
      }
  ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
