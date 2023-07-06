import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  S3,
  GetObjectCommand,
  GetObjectCommandInput,
} from "@aws-sdk/client-s3";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { s3API } from "../../../../../aws-config";
import { S3Parameters } from "aws-sdk/clients/quicksight";
import { GetObjectRequest } from "aws-sdk/clients/s3";
import { QuranChapterData, QuranVerseData } from "~/constants/arabic/texts";
import {
  generateWSQuizOptions,
  getRandomArabicLettersFromString,
} from "~/utils/backend/arabic";
import { transliterate } from "transliteration";
import {
  generateSimilarStrings,
  getRandomWordsFromString,
} from "~/utils/backend/text-processing";
import { wsQuestion, wsQuestionSchema } from "~/constants/arabic/quizzes";
import {
  ArabicWSScoreSchema,
  scoreArabicWS,
} from "~/utils/fullstack/score-user";

export const arabicQuizzesRouter = createTRPCRouter({
  getWSQuiz: publicProcedure
    .output(z.array(wsQuestionSchema))
    .query(async ({ ctx }) => {
      const wsQuestions: wsQuestion[] = [];
      const accessesQuranChapters = new Set<number>();
      // let accessesHadithChunks = new Set<number>()
      const savedWords = new Set<string>();

      while (wsQuestions.length < 4) {
        console.log("wsQuestions.length", wsQuestions.length);

        const chapterNumber = Math.floor(Math.random() * 115);
        if (accessesQuranChapters.has(chapterNumber)) continue;
        accessesQuranChapters.add(chapterNumber);
        const quranParams: GetObjectRequest = {
          Bucket: "zeraphis-arabic-texts",
          Key: `quran/chapter-${chapterNumber}.json`,
        };
        const response = await s3API.getObject(quranParams).promise();

        if (response.Body === undefined) break;
        const { verses } = JSON.parse(
          response.Body.toString("utf-8")
        ) as QuranChapterData; // Convert data from a Buffer to a String

        const { arText } = verses[
          Math.floor(Math.random() * verses.length)
        ] as QuranVerseData;
        const randomWords = getRandomWordsFromString(
          arText,
          Math.floor(Math.random() * 5)
        );
        console.log("randomWords", randomWords);

        if (randomWords.size === 0) continue;

        randomWords.forEach((text) => {
          if (savedWords.has(text)) return;
          if (savedWords.size >= 25) return;
          const transliteration = transliterate(text);
          const similarWords = generateSimilarStrings(transliteration, 3);
          const options = generateWSQuizOptions(transliteration, similarWords);
          const question: wsQuestion = {
            text,
            ...options,
          };
          savedWords.add(text);
          wsQuestions.push(question);
        });
      }

      return wsQuestions;
    }),
  // setUserScore : protectedProcedure.input(ArabicWSScoreSchema).mutation(async ({ctx, input, })=> {
  //   const ar = await ctx.prisma.language.findFirst({
  //     where : {id : ctx.session.user.id}
  //   })

  //   if (!ar) {
  //     const user = await ctx.prisma.user.update({
  //       where : {id : ctx.session.user.id},
  //       data : {ar : {}}
  //     })
  //     if(!user){
  //       throw new TRPCError({code : 'BAD_REQUEST'})
  //     }

  //   }
  //   const {finalScore, flashcards} = scoreArabicWS(input)
  //   ar.

  //   // Hash the password

  //   await ctx.prisma.user.create({
  //     data: { email, name: username, password: hashedPassword },
  //   });
  //   return { email, password };
  // })
});
