import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { pollyAPI, s3API } from "aws-config";
import { SynthesizeSpeechInput } from "aws-sdk/clients/polly";
import { GetObjectRequest, PutObjectRequest, UploadPartRequest } from "@aws-sdk/client-s3";
import { S3 } from "aws-sdk";

export const arabicVoiceLinesRouter = createTRPCRouter({
  getVoiceLines : protectedProcedure.input(z.string().min(1))
  .output(z.object({audioURL: z.string().min(1), ar: z.string().min(1)}))
  .query(async ({ctx, input})=> {
      const params: SynthesizeSpeechInput = {
        OutputFormat: "mp3",
        Text: input,
        VoiceId: "Joanna",
      };
      const { AudioStream } = await pollyAPI.synthesizeSpeech(params).promise();

      const s3Params: S3.PutObjectRequest = {
        Bucket: "zeraphis-arabic-audio",
        Key:  "alphabet",
        Body: AudioStream,
        ContentType: "audio/mpeg",
      };
      const { Location } = await s3API.upload(s3Params).promise();
      console.log('location', Location)
      return {audioURL : Location, ar : input}
    })
});
