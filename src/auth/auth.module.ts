import { UserModule } from './../user/user.module';
import { EncryptService } from './encrypt/encrypt.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService, EncryptService],
})
export class AuthModule {}
