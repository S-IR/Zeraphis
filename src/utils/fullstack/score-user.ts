import { Flashcard } from "@prisma/client";
import { z } from "zod";
import { arabicToIJMESMap } from "./process-text";

export const ArabicWSScoreSchema = z.object({
  wrongLettersMap: z.map(z.string(), z.number()),
  wrongAnswersCount: z.number(),
});

export const scoreArabicWS = ({
  wrongAnswersCount,
  wrongLettersMap,
}: z.infer<typeof ArabicWSScoreSchema>): {
  finalScore: number;
  flashcards: Omit<Flashcard, "id" | "languageId">[];
} => {
  const totalQuestions = Number(process.env.NEXT_PUBLIC_WS_TEST_QUESTION_COUNT);
  const finalScore = (wrongAnswersCount * 100) / totalQuestions;

  const flashcards: Omit<Flashcard, "id" | "languageId">[] = [];

  //WORK IN PROGRESS

  return { finalScore, flashcards };
};
