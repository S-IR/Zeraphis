// aws-config.js
import { S3Client } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const S3 = AWS.S3;
const Polly = AWS.Polly
export const s3API =  new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const pollyAPI = new PollyClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})
export default AWS;
