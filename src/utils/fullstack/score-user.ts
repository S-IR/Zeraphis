import { Flashcard } from "@prisma/client";
import { z } from "zod";
import { arabicToLatinObj, latinToArabicObj } from "./process-text";
import { FrontendFlashcard } from "~/constants/flashcards";

export const ArabicWSScoreSchema = z.object({
  wrongLettersMap: z.map(z.string(), z.number()),
  wrongAnswersCount: z.number(),
});

type scoreResult = {
  finalScore: number;
  flashcards: Omit<
    FrontendFlashcard,
    "id" | "dueTime" | "interval" | "lastReview"
  >[];
};

export const scoreArabicWS = ({
  wrongAnswersCount,
  wrongLettersMap,
}: z.infer<typeof ArabicWSScoreSchema>): scoreResult => {
  const totalQuestions = Number(process.env.NEXT_PUBLIC_WS_TEST_QUESTION_COUNT);
  const finalScore = 100 - (wrongAnswersCount * 100) / totalQuestions;

  const flashcards: Omit<
    FrontendFlashcard,
    "id" | "dueTime" | "interval" | "lastReview"
  >[] = [];

  wrongLettersMap.forEach((value, key) => {
    const front = latinToArabicObj[key];
    if (front === undefined) {
      console.log(`letter ${key} has no corresponding arabic letter `);
      return;
    }
    const easinessFactor = Math.min(
      Math.max(((1.2 + value) as unknown as number) / 10, 1.3),
      2.5
    );
    flashcards.push({
      front,
      back: key as unknown as string,
      easinessFactor,
      repetition: 0,
    });
  });

  return { finalScore, flashcards };
};
