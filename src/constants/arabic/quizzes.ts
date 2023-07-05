import { z } from "zod";

export const QuizOptionIndexes = ["a", "b", "c", "d"] as const;
export const wsQuestionSchema = z.object({
  text: z.string().min(1),
  a: z.string().min(1),
  b: z.string().min(1),
  c: z.string().min(1),
  d: z.string().min(1),
  rightAnswer: z.enum(QuizOptionIndexes),
});

export type wsQuestion = z.infer<typeof wsQuestionSchema>;
export type QuizOptionIndex = (typeof QuizOptionIndexes)[number];
