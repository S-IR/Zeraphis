import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { TRPCError } from "@trpc/server";
import { QuizOptionIndexes } from "~/constants/arabic/quizzes";
import { addURLToSlide, getDrawingSlides, getQuizSlides } from "~/utils/backend/arabic-ws";
import { arabicLetters } from "~/constants/arabic/writing-system";

export const introductionSlideSchema = z.object({
  type: z.literal("introduction"),
  symbol: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  audioURL: z.string().min(1).nullish(),
  transliteration: z.string().min(1),
});
export type IntroductionSlide = z.infer<typeof introductionSlideSchema>
export const drawingSlideSchema = z.object({
  type: z.enum(["drawing", "pronunciation"]),
  symbol: z.string().min(1),
  audioURL: z.string().min(1).nullish(),
  transliteration: z.string().min(1),
});
export type DrawingSlide = z.infer<typeof drawingSlideSchema>

export const quizQuestionSchema = z.object({
  type: z.literal("quiz-question"),
  symbol: z.string().min(1),
  translation: z.string().nullish(),
  a: z.string().min(1),
  b: z.string().min(1),
  c: z.string().min(1),
  d: z.string().min(1),
  audioURL: z.string().nullish(),
  rightAnswer: z.enum(QuizOptionIndexes),
});
export type QuizQuestionSlide = z.infer<typeof quizQuestionSchema>

export const textQuestionSchema = z
  .object({
    type: z.literal("text-question"),
    translation: z.string().nullish(),
    symbol: z.string().min(1),
    text: z.string().min(1),
    audioURL: z.string().min(1).nullish(),
    rightAnswerIndex: z.number().gte(0),
  })
  .refine((data) => data.rightAnswerIndex <= data.text.length, {
    message: "rightAnswerIndex can't be bigger than the length of the text",
    path: ["rightAnswerIndex"],
  });

export type TextQuestionSlide = z.infer<typeof textQuestionSchema>

const symbolSlideSchema = z.union([
  introductionSlideSchema,
  drawingSlideSchema,
  quizQuestionSchema,
  textQuestionSchema,
]);
export type wsSlide = z.infer<typeof symbolSlideSchema>
export const arabicTextsRouter = createTRPCRouter({
  getWSLearnSlides: publicProcedure
    .input(z.object({ requestedSymbolIndex: z.number() }))
    .output(z.array(symbolSlideSchema))
    .query(async ({ input }) => {
      const currentSymbol = arabicLetters[input.requestedSymbolIndex];
      if (currentSymbol === undefined)
        throw new TRPCError({ code: "BAD_REQUEST" });
      const previousLetters = arabicLetters
        .slice(0, input.requestedSymbolIndex)
        .map((symbolObj) => symbolObj.symbol);
      const introductionPresentation: z.infer<typeof introductionSlideSchema> =
        {
          type: "introduction",
          symbol: currentSymbol.symbol,
          name: currentSymbol.name,
          description: currentSymbol.description,
          audioURL: currentSymbol.audioURL,
          transliteration: currentSymbol.transliteration,
        };

      const drawLetters = getDrawingSlides(4, currentSymbol, previousLetters);

      const questions = getQuizSlides(currentSymbol);
      let arr = await Promise.all([
        introductionPresentation,
        ...drawLetters,
        ...questions,
      ].map(async (obj)=> await addURLToSlide(obj)));
      console.log('arr', arr);
      
      z.array(symbolSlideSchema).parse(arr)
      
      return arr 
    }),
});
