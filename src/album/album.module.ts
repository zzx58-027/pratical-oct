import { CosNodeService } from "./../cos/cos_node.service";
import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from './album.controller';

@Module({
  providers: [AlbumService, CosNodeService],
  controllers: [AlbumController],
})
export class AlbumModule {}
