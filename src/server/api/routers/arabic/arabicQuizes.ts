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
import { Flashcard } from "@prisma/client";
import {
  FlashcardFrontendSchema,
  FrontendFlashcard,
} from "~/constants/flashcards";

export const arabicQuizzesRouter = createTRPCRouter({
  getWSQuiz: publicProcedure
    .output(z.array(wsQuestionSchema))
    .query(async ({ ctx }) => {
      const wsQuestions: wsQuestion[] = [];
      const accessesQuranChapters = new Set<number>();
      // let accessesHadithChunks = new Set<number>()
      const savedWords = new Set<string>();
      console.log(
        "NEXT_PUBLIC_WS_TEST_QUESTION_COUNT",
        process.env.NEXT_PUBLIC_WS_TEST_QUESTION_COUNT
      );

      while (
        wsQuestions.length <
        Number(process.env.NEXT_PUBLIC_WS_TEST_QUESTION_COUNT) - 1
      ) {
        console.log("wsQuestions.length", wsQuestions.length);

        const chapterNumber = Math.max(1, Math.floor(Math.random() * 115));
        if (accessesQuranChapters.has(chapterNumber)) continue;
        accessesQuranChapters.add(chapterNumber);
        console.log("chapterNumber", chapterNumber);

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
          if (
            savedWords.size >=
            Number(process.env.NEXT_PUBLIC_WS_TEST_QUESTION_COUNT) - 1
          )
            return;
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
  setUserScore: protectedProcedure
    .input(ArabicWSScoreSchema)
    .output(
      z.object({
        flashcards: z.array(FlashcardFrontendSchema),
        finalScore: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ar = await ctx.prisma.language.findFirst({
        where: { arId: ctx.session.user.id },
        include: { flashcards: true },
      });
      const { finalScore, flashcards: flashcardsWithoutId } =
        scoreArabicWS(input);
      console.log("flashcardsWithoutId", flashcardsWithoutId);
      if (flashcardsWithoutId.length === 0) throw new Error("bug");
      if (ar === null) {
        const user = await ctx.prisma.user.findFirst({
          where: { id: ctx.session.user.id },
        });
        if (!user) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
        const { flashcards: flashcardsWithLanguageId } =
          await ctx.prisma.language.create({
            data: {
              arId: ctx.session.user.id,
              wsProgress: finalScore,
              flashcards: { create: flashcardsWithoutId },
            },
            include: { flashcards: true },
          });
        const flashcards = flashcardsWithLanguageId.map((card) => {
          const { languageId, ...rest } = card;
          return rest;
        });
        return { flashcards, finalScore };
      } else {
        const currentFlashcards = await ctx.prisma.flashcard.findMany({
          where: { languageId: ar.id },
        });
        const flashcards = await Promise.all(
          flashcardsWithoutId.map(async (card) => {
            const existingCard = currentFlashcards.find(
              (currentCard) =>
                currentCard.front === card.front &&
                currentCard.back === card.back
            );
            if (!existingCard) {
              const { languageId, ...rest } = await ctx.prisma.flashcard.create(
                {
                  data: { ...card, languageId: ctx.session.user.id },
                }
              );
              return rest;
            } else {
              const { languageId, ...rest } = await ctx.prisma.flashcard.update(
                {
                  where: { id: existingCard.id },
                  data: { ...card, languageId: ctx.session.user.id },
                }
              );
              return rest;
            }
          })
        );
        return { flashcards, finalScore };
      }
    }),
});
