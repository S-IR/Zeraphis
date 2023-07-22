import React, { useState } from "react";
import { AnswerButton } from "~/components/arabic";
import { QuizButtonStatus } from "~/components/arabic/AnswerButton";
import { QuizOptionIndex, QuizOptionIndexes } from "~/constants/arabic/quizzes";
import { QuizQuestionSlide } from "~/server/api/routers/arabic/arabicTexts";
import { determineButtonStatus } from "~/utils/frontend/tests";

interface props {
  slide: QuizQuestionSlide;
  currentSlideIndex: number;
  incrementSlide: () => void;
  decreaseScore: () => void;
}

const QuizQuestionSlide = ({
  currentSlideIndex,
  decreaseScore,
  incrementSlide,
  slide,
}: props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<QuizOptionIndex | null>(
    null
  );
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);

  const handleButtonClick = (option: QuizOptionIndex) => {
    setIsTimeoutActive(true);
    if (option !== slide.rightAnswer) decreaseScore();
    incrementSlide();
    setIsTimeoutActive(false);
  };
  return (
    <section className="flex h-full w-full flex-col items-center justify-end pt-24 ">
      <section className="relative flex w-3/5 flex-grow-[16] items-center justify-center overflow-clip rounded-xl rounded-t-3xl border-4  bg-[#9DD] align-middle">
        <h1 className="my-6 w-full text-center text-6xl ">
          {slide.symbol} <br></br>
          Choose the correct transliteration
        </h1>
      </section>
      <section className="flex h-24 w-3/5 flex-grow-[1] overflow-visible ">
        {QuizOptionIndexes.map((option) => {
          const correctStatus: QuizButtonStatus = determineButtonStatus(
            option,
            selectedAnswer,
            slide.rightAnswer
          );
          const handleClick = () => {
            // Call the onClick event handler and pass the option value
            handleButtonClick(option);
          };

          return (
            <AnswerButton
              key={option}
              disabled={isTimeoutActive}
              status={correctStatus}
              text={slide[option]}
              handleClick={handleClick}
            />
          );
        })}
      </section>
    </section>
  );
};

export default QuizQuestionSlide;
