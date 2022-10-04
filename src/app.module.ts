import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://docker:mongopw@localhost:55000', {
      dbName: "october"
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
