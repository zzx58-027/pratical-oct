import { CosNodeService } from "./../cos/cos_node.service";

import { Injectable } from "@nestjs/common";
import {
  DeleteObjectResult,
  PutObjectResult,
} from "cos-nodejs-sdk-v5";

@Injectable()
export class AlbumService {
  private basicParams: {
    Bucket: string,
    Region: string
  };
  constructor(private readonly cosService: CosNodeService) {
    this.basicParams = {
      Bucket: process.env.COS_Bucket,
      Region: process.env.COS_Bucket_Region,
    };
    // this.deleteAlbum("zzx58/")
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
    const objects = (await this.cosService.getObjectList(myParams)).Contents.map(item => {
        return {Key: item.Key}
    });
    const result = await this.cosService.cos.deleteMultipleObject({
        ...myParams,
        Objects: objects,
    });
    return result;
  }
}
