import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PaintingModule } from "./painting/painting.module";
import { CosNodeService } from "./painting/cos/cos_node.service";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL, {
      dbName: process.env.USE_DATABASE_BUCKET,
    }),
    AuthModule,
    UserModule,
    PaintingModule,
  ],
  controllers: [],
  providers: [CosNodeService],
})
export class AppModule {}
