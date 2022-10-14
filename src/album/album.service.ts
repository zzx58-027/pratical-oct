import { CosNodeService } from "./../cos/cos_node.service";

import { Injectable } from "@nestjs/common";
import { DeleteObjectResult, PutObjectResult } from "cos-nodejs-sdk-v5";

@Injectable()
export class AlbumService {
  private basicParams: {
    Bucket: string;
    Region: string;
  };
  constructor(private readonly cosService: CosNodeService) {
    this.basicParams = {
      Bucket: process.env.COS_Bucket_Name,
      Region: process.env.COS_Bucket_Region,
    };
    this.main();
  }

  //创建目录
  async createAlbum(
    albumName: string,
    inputParams?: {
      Bucket: string;
      Region: string;
      Key: string;
    }
  ): Promise<PutObjectResult> {
    const myParams = {
      ...this.basicParams,
      Body: "",
      Key: albumName,
      ...inputParams,
    };
    const result = this.cosService.cos.putObject(myParams);
    return result;
  }

  async deleteAlbum(
    albumName: string,
    inputParams?: {
      Bucket: string;
      Region: string;
      Prefix: string;
    }
  ): Promise<DeleteObjectResult> {
    const myParams = {
      ...this.basicParams,
      Prefix: albumName,
      ...inputParams,
    };
    const objects = (
      await this.cosService.getObjectList(myParams)
    ).Contents.map((item) => {
      return { Key: item.Key };
    });
    const result = await this.cosService.cos.deleteMultipleObject({
      ...myParams,
      Objects: objects,
    });
    return result;
  }

  async getAlbumContent(
    albumName: string,
    inputParams?: {
      Bucket: string;
      Region: string;
      Prefix: string;
    }
  ) {
    const myParams = {
      ...this.basicParams,
      Prefix: albumName,
      ...inputParams,
    };
    const result = await this.cosService.getObjectList(myParams);
    return result;
  }

  async changeAlbumNameTo(newName: string, oldName: string) {
    const targetFolderPath = `${newName}`;
    const sourceFolderPath = `${oldName}`;
    const result = await this.cosService.moveFolderTo(
      targetFolderPath,
      sourceFolderPath
    );
    return result;
  }

  async main() {
    /* 
    const albumContent = await this.getAlbumContent("zzx58");
    console.log(albumContent); */

    /* 
    const copyFolder = await this.cosService.copyFileTo(
      "1095568627/",
      "1-1.png",
      "zzx58/1.png"
    );
    console.log(copyFolder); */

    /* 
    const result = await this.cosService.moveFileTo(
      "1095568627/",
      "1-1.png",
      "zzx58/1.png"
    )
    console.log(result); */

    /* 
    const result = await this.cosService.copyFolderTo("zzx58", "1095568627");
    // const result = await this.cosService.copyFolderTo("1095568627", "zzx58");
    // const result = await this.cosService.copyFolderTo("1095568628", "zzx58");
    console.log(result); */

    const result = await this.changeAlbumNameTo("1095568627", "zzx58");
    console.log(result);
    
  }
}
