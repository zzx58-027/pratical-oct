import { Painting } from "./../painting/painting.schema";
import { Injectable } from "@nestjs/common";
import * as COS from "cos-nodejs-sdk-v5";
import * as fse from "fs-extra";

//对象存储（Cloud Object Storage，COS)
@Injectable()
export class CosNodeService {
  readonly cos: COS;
  basicParams: {
    // private basicParams: {
    Bucket: string;
    Region: string;
  };
  readonly configurations: {
    // private readonly configurations: {
    secretId: string | undefined;
    secretKey: string | undefined;
    // Bucket: string | undefined
    // Region: string | undefined
  };
  // private readonly configService: ConfigService
  constructor() {
        this.configurations = {
      secretId: process.env.COS_SecretId,
      secretKey: process.env.COS_SecretKey,
      // secretId: this.configService.get<string>("COS_SecretId"),
      // secretKey: this.configService.get<string>("COS_SecretKey")
    };
    this.cos = new COS({
      SecretId: this.configurations.secretId,
      SecretKey: this.configurations.secretKey,
      // SecretId: "AKIDa8GRYQ7gDaouoX5QlGkHh2JQNAnGYcQ2",
      // SecretKey: "SAuU42qQlrId52tdHpLl17C6sfKm252w",
    });
    this.basicParams = {
      Bucket: process.env.COS_Bucket_Name,
      Region: process.env.COS_Bucket_Region,
    };
    // this.main();
  }

  /* Tips:  
  判断对象为空的方法： for..in.. , JSON.stringify() , Object.keys()

  如何使生成的对象URL在浏览器中打开是预览，而不是下载：在获取的url后拼接参数 response-content-disposition=inline
  如何使生成的对象URL在浏览器中打开是下载，而不是预览：在获取的url后拼接参数 response-content-disposition=attachment


 */

  //存储桶操作

  async getSpecificBuckets(
    bucketName: string
  ): Promise<{ Name: string; Location: string; CreationDate: string }> {
    const getBucketsResult = await this.getBuckets({});
    const buckets = getBucketsResult.Buckets.filter(
      (item) => item.Name.includes(bucketName) === true
    );
    return buckets[0];
  }

  /**
   * @param  {COS.GetServiceParams} params
   * @description 如果不传参数进入对象，则返回所有区域的Buckets.
   * @returns Promise
   * @required Bucket: string, Region: string
   */
  async getBuckets(
    params?: COS.GetServiceParams
  ): Promise<COS.GetServiceResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.getService(myParams);
    return result;
  }

  //    // SecretId: "AKIDa8GRYQ7gDaouoX5QlGkHh2JQNAnGYcQ2",
  // SecretKey: "SAuU42qQlrId52tdHpLl17C6sfKm252w",
  /**
   * @param  {COS.PutBucketParams} params
   * @returns Promise
   * @required Bucket: string, Region: string
   */
  async putBucket(params?: COS.PutBucketParams): Promise<COS.PutBucketResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.putBucket(myParams);
    return result;
  }
  /**
   * @param  {COS.HeadBucketParams} params
   * @returns Promise
   * @required Bucket: string, Region: string
   */
  async doesBucketExist(
    params?: COS.HeadBucketParams
  ): Promise<COS.HeadBucketResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.headBucket(myParams);
    return result;
  }
  /**
   * @param  {COS.DeleteBucketParams} params
   * @returns Promise
   * @required Bucket: string, Region: string
   */
  async deleteBucket(
    params?: COS.DeleteBucketParams
  ): Promise<COS.HeadBucketResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.deleteBucket(myParams);
    return result;
  }

  //对象操作

  /**
   * @param  {COS.PutObjectParams} params
   * @returns Promise
   * @example {
   * Bucket: 'examplebucket-1250000000', //填入您自己的存储桶，必须字段
   * Region: 'COS_REGION', //存储桶所在地域，例如ap-beijing，必须字段
   * Key: '1.jpg' //存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段
   * FilePath: filePath, //必须
   * SliceSize: 1024 * 1024 * 5, //触发分块上传的阈值，超过5MB使用分块上传，非必须
   * onTaskReady: function(taskId) {
   *    console.log(taskId);
   * },
   * onProgress: function (progressData) {
   *    console.log(JSON.stringify(progressData));
   * },
   * onFileFinish: function (err, data, options) {
   *    console.log(options.Key + '上传' + (err ? '失败' : '完成'));
   * },
   * }
   */
  async putFileObject(
    params?: COS.PutObjectParams
  ): Promise<COS.PutObjectResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.putObject(myParams);
    return result;
  }
  /**
   * @param  {COS.UploadFileParams} params
   * @returns Promise
   * @description
   */
  async uploadFile(
    params?: COS.UploadFileParams
  ): Promise<COS.UploadFileResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.uploadFile(myParams);
    return result;
  }
  /**
   * @param  {COS.GetObjectParams} params
   * @returns Promise
   * @required Bucket: string, Region: string, Key: string
   * @optional Range: string, Output: string[filePath]， OutputStream: Stream, Headers[下载限速]
   */
  async downloadFileObject(
    params?: COS.GetObjectParams
  ): Promise<COS.GetObjectResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = await this.cos.getObject(myParams);
    return result;
  }

  /**
   * @param  {COS.GetObjectParams} params
   * @returns Promise
   * @building
   */
  async downloadFileObjectByStream(
    params?: COS.GetObjectParams
  ): Promise<void> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
  }
  /**
   * @param  {COS.GetBucketParams} params
   * @returns Promise
   * @required Bucket: string, Region: string
   * @optional Prefix: string, Key: string, Delimiter: string, Marker: marker, MaxKeys: number
   * @optionsDescrption
   */
  async getObjectList(
    params?: COS.GetBucketParams
  ): Promise<COS.GetBucketResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.getBucket(myParams);
    return result;
  }
  /**
   * @param  {COS.DeleteObjectParams} params
   * @returns Promise
   * @required Bucket: string, Region: string, Key: string
   * @optional Objects: Array[Objects], Prefix: string, MaxKeys: number
   */
  async deleteObject(
    params?: COS.DeleteObjectParams
  ): Promise<COS.DeleteObjectResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.deleteObject(myParams);
    return result;
  }

  async deleteMultipleObjects(
    objects: Array<{ Key: COS.Key }>,
    params?: COS.DeleteMultipleObjectParams
  ) {
    const myParams = {
      ...this.basicParams,
      Objects: objects,
      ...params,
    };
    const result = await this.cos.deleteMultipleObject(myParams);
    return result;
  }

  /**
   * @param  {COS.HeadObjectParams} params
   * @returns Promise
   * @required Bucket: string, Region: string, Key: string
   */
  async doesObjectExist(
    params?: COS.HeadObjectParams
  ): Promise<COS.HeadObjectResult> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = this.cos.headObject(myParams);
    return result;
  }
  /**
   * @param  {COS.GetObjectUrlParams} params
   * @returns Promise
   * @required Bucket: string, Region: string, Key: string
   * @optional Sign: Boolean //获取带签名的对象URL
   * @Reminder 当存储桶为私有读时，需要签名
   */
  async getObjectUrl(
    isDownload: Boolean,
    params?: COS.GetObjectUrlParams
  ): Promise<string> {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    const result = {
      Url: "",
      downloadFileUrl: "",
    };

    const promiseResult = await new Promise((resolve, rejects) => {
      this.cos.getObjectUrl(myParams, (err, data) => {
        if (err) {
          console.log(err);
          rejects(err);
        }
        result.Url = data.Url;
        result.downloadFileUrl =
          data.Url +
          (data.Url.indexOf("?") > -1 ? "&" : "?") +
          "response-content-disposition=attachment";
        resolve(result);
      });
    });
    console.log(promiseResult);
    if (isDownload === true) return result.downloadFileUrl;
    return result.Url;
  }
  /**
   * @param  {{Bucket;Region;Key;FilePath}} params
   * @building
   */
  async downloadFileLocal(params?: { Bucket; Region; Key; FilePath }) {
    const myParams = {
      ...this.basicParams,
      ...params,
    };
    //@ts-ignore
    const result = await this.cos.downloadFile(myParams);
    return result;
  }

  //move file
  //senior method
  //'school-work-1308651335.cos.ap-shanghai.myqcloud.com/zzx58/zzx58.png'
  async copyFileTo(
    targetFullPath: string,
    sourceFullPath: string,
    params?: COS.SliceCopyFileParams
  ) {
    const myParams = {
      ...this.basicParams,
      Key: `${targetFullPath}`,
      ...params,
    };
    const actualParams = {
      ...myParams,
      CopySource: `${this.basicParams.Bucket}.cos.${this.basicParams.Region}.myqcloud.com/${sourceFullPath}`,
    }
    const result = await this.cos.sliceCopyFile(actualParams);
    return result;
  }

  async moveFileTo(
    targetFolderPath: string,
    newFileName: string,
    sourceFolderPath: string,
    sourceFileName: string,
    params?: COS.SliceCopyFileParams
  ) {
    const myParams = {
      ...this.basicParams,
      Key: `${targetFolderPath}/${newFileName}`,
      CopySource: `${this.basicParams.Bucket}.cos.${this.basicParams.Region}.myqcloud.com/${sourceFolderPath}/${sourceFileName}`,
      ...params,
    };
    const copyResult = await this.cos.sliceCopyFile(myParams);
    const deleteResult = await this.deleteObject({
      ...this.basicParams,
      Key: `${sourceFolderPath}/${sourceFileName}`,
    });
    return [copyResult, deleteResult];
  }

  async copyFolderTo(
    objects: Array<{
      Key: COS.Key;
    }>,
    targetFolderPath: string,
    param?: COS.SliceCopyFileParams
  ) {
    const copyFolderResult = await Promise.all(
      objects.map(async (item) => {
        const newFileName = item.Key.substring(item.Key.indexOf("/"));
        const targetFullPath = `${targetFolderPath}/${newFileName}`;
        const sourceFullPath = item.Key;
        const itemResult = await this.copyFileTo(
          targetFullPath,
          sourceFullPath
        );
        return itemResult;
      })
    );
    return copyFolderResult;
  }

  async moveFolderTo(
    targetFolderPath: string,
    sourceFolderPath: string,
    param?: COS.SliceCopyFileParams
  ) {
    const objects = (
      await this.getObjectList({
        ...this.basicParams,
        Prefix: sourceFolderPath,
      })
    ).Contents.map((item) => {
      return { Key: item.Key };
    });
    const copyFolderResult = await this.copyFolderTo(
      objects,
      targetFolderPath,
    );
    const deleteFolderResult = await this.deleteMultipleObjects(objects);
    return {
      copyFolderResult,
      deleteFolderResult,
    };
  }

  async main() {
    /* 
    //获取符合条件的buckets
    // const getBucketsResult = await this.getSpecificBuckets("school-work");
    // console.log(getBucketsResult);
    */
    /* 
    //获取特定前缀开头的album中内容
    // const getObjectList = await this.getObjectList({
    //   ...this.basicParams,
    //   Prefix: "zzx58"
    // });
    // console.log(getObjectList);
     */
    // if (buckets) {
    // const params = {
    //   Bucket: buckets[0].Name,
    //   Region: buckets[0].Location,
    // };
    //   const objectList = await this.getObjectList({
    //     ...params,
    //     Prefix: "zzx58",
    //   });
    // console.log(objectList);
    // if (objectList) {
    //   const { Bucket, Region } = params;
    //   const params1 = {
    //     Bucket,
    //     Region,
    //     Key: objectList.Contents[0].Key,
    //     Sign: true,
    //   };
    // const avatarUrl = await this.getObjectUrl(params1, false);
    // console.log(avatarUrl);
    // const fileParams = {
    //   ...params,
    //   Key: objectList.Contents[0].Key,
    //   FilePath: './public/' + objectList.Contents[0].Key,
    // };
    //@ts-ignore
    // const down = await this.cos.downloadFile(fileParams);
    // console.log(down);

    // uploadFile senior method
    // Location: 'school-work-1308651335.cos.ap-shanghai.myqcloud.com/zzx58/zzx58.png',
    const upload = await this.uploadFile({
      ...this.basicParams,
      FilePath: "./public/zzinx58.png",
      Key: "1095568627/1-1png",
    });
    console.log(upload);

    // }
  }
}
