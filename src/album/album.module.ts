import { Album, albumSchema } from "./album.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { CosNodeService } from "./../cos/cos_node.service";
import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";

@Module({
  providers: [AlbumService, CosNodeService],
  controllers: [AlbumController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: albumSchema,
      },
    ]),
  ],
})
export class AlbumModule {}
