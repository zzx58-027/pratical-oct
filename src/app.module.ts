import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://docker:mongopw@localhost:55000', {
      dbName: "october"
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
