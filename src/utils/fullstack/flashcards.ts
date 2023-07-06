import { z } from "zod";
import {
  flashcardEasinessFactor,
  flashcardInterval,
  flashcardRepetition,
  flashcardUserGrade,
  spacedRepetitionAlgorithmResult,
} from "~/constants/flashcards";

export const spacedRepetitionAlgorithm = (
  userGrade: flashcardUserGrade,
  repetition: flashcardRepetition,
  easinessFactor: flashcardEasinessFactor,
  interval: flashcardInterval
): spacedRepetitionAlgorithmResult => {
  if (userGrade < 2) {
    repetition = 0;
    interval = 1;
  } else {
    repetition = repetition + 1;
    switch (repetition) {
      case 1:
        interval = 1;
        break;
      case 2:
        interval = 6;
        break;
      default:
        interval = interval * easinessFactor;
    }
  }

  easinessFactor =
    easinessFactor + 0.1 - (3 - userGrade) * (0.08 + (3 - userGrade) * 0.02);
  if (easinessFactor < 1.3) easinessFactor = 1.3;
  if (easinessFactor > 2.5) easinessFactor = 2.5;

  return {
    repetition,
    easinessFactor,
    interval,
  };
};
