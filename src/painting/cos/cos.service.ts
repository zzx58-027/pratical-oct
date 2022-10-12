import { Injectable } from "@nestjs/common";
import type {} from "cos-nodejs-sdk-v5";
import * as COS from "cos-nodejs-sdk-v5";
import { Stream } from "stream";

@Injectable()
export class CosService {
  private readonly cos = new COS({
    SecretId: "AKIDFSfiW5PVMyOrLix3vcHrZ7QZVRSUM1Qa",
    SecretKey: "3UuHdgisunUyFMErIdswqjggiq2EH8nC",
  });
  constructor() {}

  /* Tips:  
  判断对象为空的方法： for..in.. , JSON.stringify() , Object.keys()

  如何使生成的对象URL在浏览器中打开是预览，而不是下载：在获取的url后拼接参数 response-content-disposition=inline
  如何使生成的对象URL在浏览器中打开是下载，而不是预览：在获取的url后拼接参数 response-content-disposition=attachment


 */

  //存储桶操作
  /**
   * @param  {COS.GetServiceParams} params
   * @description 如果不传参数进入对象，则返回所有区域的Buckets.
   * @returns Promise
   * @required Bucket: string, Region: string
   */
  async getBuckets(
    params: COS.GetServiceParams
  ): Promise<COS.GetServiceResult> {
    const result = this.cos.getService(params);
    return result;
  }
  /**
   * @param  {COS.PutBucketParams} params
   * @returns Promise
   * @required Bucket: string, Region: string
   */
  async putBucket(params: COS.PutBucketParams): Promise<COS.PutBucketResult> {
    const result = this.cos.putBucket(params);
    return result;
  }
  /**
   * @param  {COS.HeadBucketParams} params
   * @returns Promise
   * @required Bucket: string, Region: string
   */
  async doesBucketExist(
    params: COS.HeadBucketParams
  ): Promise<COS.HeadBucketResult> {
    const result = this.cos.headBucket(params);
    return result;
  }
  /**
   * @param  {COS.DeleteBucketParams} params
   * @returns Promise
   * @required Bucket: string, Region: string
   */
  async deleteBucket(
    params: COS.DeleteBucketParams
  ): Promise<COS.HeadBucketResult> {
    const result = this.cos.deleteBucket(params);
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
  async uploadFile(params: COS.PutObjectParams): Promise<COS.PutObjectResult> {
    const result = this.cos.putObject(params);
    return result;
  }
  /**
   * @param  {COS.GetObjectParams} params
   * @returns Promise
   * @required Bucket: string, Region: string, Key: string
   * @optional Range: string, Output: string[filePath]， OutputStream: Stream, Headers[下载限速]
   */
  async downloadFileObject(
    params: COS.GetObjectParams
  ): Promise<COS.GetObjectResult> {
    const result = this.cos.getObject(params);
    return result;
  }

  /**
   * @param  {COS.GetObjectParams} params
   * @returns Promise
   * @building
   */
  async downloadFileObjectByStream(
    params: COS.GetObjectParams
  ): Promise<void> {}
  /**
   * @param  {COS.GetBucketParams} params
   * @returns Promise
   * @required Bucket: string, Region: string
   * @optional Prefix: string, Delimiter: string, Marker: marker, MaxKeys: number
   */
  async getObjectList(
    params: COS.GetBucketParams
  ): Promise<COS.GetBucketResult> {
    const result = this.cos.getBucket(params);
    return result;
  }
  /**
   * @param  {COS.DeleteObjectParams} params
   * @returns Promise
   * @required Bucket: string, Region: string, Key: string
   * @optional Objects: Array[Objects], Prefix: string, MaxKeys: number
   */
  async deleteObject(
    params: COS.DeleteObjectParams
  ): Promise<COS.DeleteObjectResult> {
    const result = this.cos.deleteObject(params);
    return result;
  }
  /**
   * @param  {COS.HeadObjectParams} params
   * @returns Promise
   * @required Bucket: string, Region: string, Key: string
   */
  async doesObjectExist(
    params: COS.HeadObjectParams
  ): Promise<COS.HeadObjectResult> {
    const result = this.cos.headObject(params);
    return result;
  }
  /**
   * @param  {COS.GetObjectUrlParams} params
   * @returns Promise
   * @required Bucket: string, Region: string, Key: string
   * @optional Sign: Boolean //获取带签名的对象URL
   */
  async getObjectUrl(
    params: COS.GetObjectUrlParams, isDownload: Boolean
  ): Promise<string> {
    const result = {
      Url: "",
      downloadFileUrl: "",
    };
    this.cos.getObjectUrl(params, (err, data) => {
      if (err) return console.log(err);
      result.Url = data.Url;
      result.downloadFileUrl =
        data.Url +
        (data.Url.indexOf("?") > -1 ? "&" : "?") +
        "response-content-disposition=attachment";
    });
    if (isDownload === true) return result.downloadFileUrl;
    return result.Url;
  }

  async main() {
    const getBucketsResult = await this.getBuckets({});
    const buckets = getBucketsResult.Buckets.filter(item => item.Name.includes("school-work") === true);
    console.log(buckets);
    if(buckets) {
        const params = {
            Bucket: buckets[0].Name,
            Region: buckets[0].Location
        }
        const result = await this.getObjectList(params);
        console.log(result);
    }
    
  }
}

const main = new CosService();
main.main();
