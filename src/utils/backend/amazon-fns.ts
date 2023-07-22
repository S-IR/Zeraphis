import { GetObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ZeraphisS3Bucket } from "~/constants/general/amazon";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3API } from "aws-config";
import { Error } from "aws-sdk/clients/s3";

export async function generatePresignedUrl(Bucket : ZeraphisS3Bucket, Key : string, expiresIn : number) {
  const command = new GetObjectCommand({
    Bucket,
    Key
  });

  const url = await getSignedUrl(s3API, command, {
    expiresIn
  });

  console.log(`Generated presigned URL: ${url}`);
}

export async function checkIfS3FileExists(bucket: string, key: string) {
  const params = {
      Bucket: bucket,
      Key: key,
  };

  try {
      await s3API.send(new HeadObjectCommand(params));
      return true;
  } catch (error) {
      if ( error instanceof Error &&  error.name === 'NoSuchKey') {
          return false;
      }
      throw error;
  }
}
