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
import {
  GetObjectCommand,
  GetObjectRequest,
  PutObjectCommand,
  PutObjectRequest,
  UploadPartRequest,
} from "@aws-sdk/client-s3";
import { S3 } from "aws-sdk";
import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { checkIfS3FileExists } from "~/utils/backend/amazon-fns";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const arabicVoiceLinesRouter = createTRPCRouter({
  getVoiceLines: protectedProcedure
    .input(z.string().min(1))
    .output(z.object({ audioURL: z.string().min(1), ar: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      console.log('input', input);
      
      const Bucket = "zeraphis-arabic-audio";
      const Key = `learn-writing-system/${input}.mp3`;

      const exists = await checkIfS3FileExists(Bucket, Key);
      if (!exists) {
        console.log("!exists running");

        const params = {
          OutputFormat: "mp3",
          Text: input,
          VoiceId: "Hala",
          Engine: "neural",
        };
        const pollyCommand = new SynthesizeSpeechCommand(params);

        const { AudioStream } = await pollyAPI.send(pollyCommand);
        const s3Params = {
          Bucket,
          Key,
          Body: AudioStream,
          ContentType: "audio/mpeg",
        };
        const command = new PutObjectCommand(s3Params);
        await s3API.send(command);
      }
      const presignCommand = new GetObjectCommand({ Bucket, Key });
      const audioURL = await getSignedUrl(s3API, presignCommand, {
        expiresIn: 3600,
      });

      
      return { audioURL, ar: input };
    }),
});
