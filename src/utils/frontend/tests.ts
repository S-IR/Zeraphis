import { QuizButtonStatus } from "~/components/arabic/AnswerButton";
import { QuizOptionIndex } from "~/constants/arabic/quizzes";

export const determineButtonStatus = (
  option: QuizOptionIndex,
  selectedAnswer: QuizOptionIndex | null,
  rightAnswer: QuizOptionIndex
): QuizButtonStatus => {
  if (selectedAnswer === null) return null;
  if (option === rightAnswer) return "correct";
  if (selectedAnswer === option && option !== rightAnswer) return "incorrect";
  return "neither-correct-nor-incorrect";
};