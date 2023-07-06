import { z } from "zod";

export const flashcardUserGradeSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);
export const flashcardRepetitionSchema = z.number().int();
export const flashcardEasinessFactorSchema = z.number().gte(1.3).lte(2.5);
export const flashcardIntervalSchema = z.number().gt(0);

export type flashcardUserGrade = z.infer<typeof flashcardUserGradeSchema>;
export type flashcardRepetition = z.infer<typeof flashcardRepetitionSchema>;
export type flashcardEasinessFactor = z.infer<
  typeof flashcardEasinessFactorSchema
>;
export type flashcardInterval = z.infer<typeof flashcardIntervalSchema>;
export const spacedRepetitionAlgorithmSchema = z.object({
  repetition: flashcardRepetitionSchema,
  easinessFactor: flashcardEasinessFactorSchema,
  interval: flashcardIntervalSchema,
});
export type spacedRepetitionAlgorithmResult = z.infer<
  typeof spacedRepetitionAlgorithmSchema
>;
export const FlashcardFrontendSchema = z.object({
  id: z.string(),
  front: z.string(),
  back: z.string(),
  interval: z.number(),
  repetition: z.number(),
  easinessFactor: z.number(),
  lastReview: z.date().nullable(),
  dueTime: z.date(),
});
export type FrontendFlashcard = z.infer<typeof FlashcardFrontendSchema>;
