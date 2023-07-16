export type QuranVerseData = z.infer<typeof verseSchema>;
export type QuranChapterData = {
  arChapterName: string;
  enChapterName: string;
  verses: QuranVerseData[];
};
export type QuranData = QuranChapterData[];

import { z } from "zod";
import { QuizOptionIndexes } from "./quizzes";

export const verseSchema = z.object({
  chNumber: z.number().min(1),
  verseChNumber: z.number().min(1),
  verseQuranNumber: z.number().min(1),
  arText: z.string().min(1),
  enText: z.string().min(1),
  transliteration: z.string().min(1),
  audioURL: z.array(z.string()).nonempty(),
});

