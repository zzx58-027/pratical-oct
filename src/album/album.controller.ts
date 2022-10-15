import { AlbumService } from "./album.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("album")
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post("/getAlbumContent")
  getAlbumContent(@Body() data: { albumName: string }) {
    return this.albumService.getAlbumContent(data.albumName);
  }

  @Post("/createAlbum")
  createAlbum(@Body() data: { albumName: string }) {
    return this.albumService.createAlbum(data.albumName);
  }

  @Post("deleteAlbum")
  deleteAlbum(@Body() data: { albumName: string }) {
    return this.albumService.deleteAlbum(data.albumName);
  }

  @Post("changeAlbumNameTo")
  changeAlbumNameTo(@Body() data: { newName: string; oldName: string }) {
    return this.albumService.changeAlbumNameTo(data.newName, data.oldName);
  }
}
