import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { useTransition, animated } from "react-spring";
import {
  QuizOptionIndex,
  QuizOptionIndexes,
  wsQuestion,
} from "~/constants/arabic/quizzes";
import { FrontendFlashcard } from "~/constants/flashcards";
import { api } from "~/utils/api";
import { findDifferentLetters } from "~/utils/fullstack/process-text";
import AnswerButton, { QuizButtonStatus } from "./AnswerButton";

interface props {
  questions: wsQuestion[];
  setTestResults: React.Dispatch<
    React.SetStateAction<{
      flashcards: FrontendFlashcard[];
      finalScore: number;
    } | null>
  >;
  fetchNextPage: () => Promise<unknown>;
}

const determineButtonStatus = (
  option: QuizOptionIndex,
  selectedAnswer: QuizOptionIndex | null,
  rightAnswer: QuizOptionIndex
): QuizButtonStatus => {
  if (selectedAnswer === null) return null;
  if (option === rightAnswer) return "correct";
  if (selectedAnswer === option && option !== rightAnswer) return "incorrect";
  return "neither-correct-nor-incorrect";
};
const ArabicTest = ({ questions, setTestResults, fetchNextPage }: props) => {
  const [wrongLettersMap, setWrongLettersMap] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  const [selectedAnswer, setSelectedAnswer] = useState<QuizOptionIndex | null>(
    null
  );

  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const transitions = useTransition(
    currentQuestion === undefined ? "" : currentQuestion.text,
    {
      from: { opacity: 0, transform: `translateX(-30%) translateY(-50%)` },
      enter: { opacity: 1, transform: `translateX(-50%) translateY(-50%)` },
      leave: { opacity: 0, transform: `translateX(-70%) translateY(-50%)` },
    }
  );
  useEffect(() => {
    console.log("questions", questions);
  }, [currentQuestion]);
  const queryClient = useQueryClient();

  const { mutate: mutateUserScore, isLoading: isMutating } =
    api.arabic.quizzes.setUserScore.useMutation({
      onSuccess: ({ flashcards, finalScore }) => {
        const arabicFlashcards = queryClient.getQueryData<
          FrontendFlashcard[] | undefined
        >(["userArabicFlashcards"]);
        if (arabicFlashcards === undefined) {
          queryClient.setQueryData(["userArabicFlashcards"], flashcards);
        } else {
          arabicFlashcards.filter((existingCard) =>
            flashcards.some(
              (newCard) =>
                newCard.front === existingCard.front &&
                newCard.back === existingCard.back
            )
          );
          queryClient.setQueryData(
            ["userArabicFlashcards"],
            [...arabicFlashcards, ...flashcards]
          );
        }
        setTestResults({ flashcards, finalScore });
      },
      onError: () => {
        toast.error(
          "A server error has occurred while processing your request. Please try again later"
        );
      },
    });
  if (currentQuestion === undefined) return <PuffLoader size={50} />;

  const handleButtonClick = (option: QuizOptionIndex) => {
    setSelectedAnswer(option);
    setIsTimeoutActive(true);

    setTimeout(() => {
      if (questions !== undefined && (currentQuestionIndex + 2) % 4 === 0) {
        console.log("fetching next page");

        fetchNextPage();
      }
      if (
        questions !== undefined &&
        currentQuestionIndex >= questions.length - 1
      ) {
        mutateUserScore({ wrongAnswersCount, wrongLettersMap });
      }
      if (option !== currentQuestion.rightAnswer) {
        const wrongLetters = findDifferentLetters(
          currentQuestion[option],
          currentQuestion[currentQuestion.rightAnswer]
        );

        setWrongLettersMap((map) => {
          wrongLetters.forEach((letter) => {
            if (!map.has(letter)) {
              map.set(letter, 1);
            } else {
              const count = map.get(letter);
              if (!count) return;
              map.set(letter, count + 1);
            }
          });
          return map;
        });

        setWrongAnswersCount((v) => v + 1);
      }

      setCurrentQuestionIndex((v) => v + 1);
      setSelectedAnswer(null);
      setIsTimeoutActive(false);
    }, 2000);
  };
  if (isMutating)
    return (
      <section className="flex h-screen w-screen items-center justify-center align-middle">
        <h2 className="text-4xl">Please wait</h2>
        <PuffLoader size={50} />
      </section>
    );
  return (
    <main className="mt-4 flex h-auto min-h-screen w-full flex-col items-center">
      <h1 className="my-6 w-full text-center text-3xl ">
        Click on the correct transliteration of the following letter / letters
      </h1>
      <section className="relative flex h-[60vh] w-3/5 items-center justify-center overflow-clip rounded-xl border-4 border-green-900 bg-[#FDF0B6] align-middle">
        <Image
          src={"/arabic/writing-system/test/greenflr.png"}
          alt={"green flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src={"/arabic/writing-system/test/greenflr.png"}
          alt={"green flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
        />
        <Image
          src={"/arabic/writing-system/test/greenflr.png"}
          alt={"green flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
        />
        <Image
          src={"/arabic/writing-system/test/greenflr.png"}
          alt={"green flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
        />
        {transitions((styles, text) => (
          <animated.span
            style={styles}
            className="spacing absolute left-1/2 top-1/2 font-arabic text-[192px]  tracking-wide text-black "
          >
            {text}
          </animated.span>
        ))}
      </section>
      <section className="flex h-24 w-3/5 overflow-visible">
        {QuizOptionIndexes.map((option) => {
          const correctStatus: QuizButtonStatus = determineButtonStatus(
            option,
            selectedAnswer,
            currentQuestion.rightAnswer
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
              text={currentQuestion[option]}
              handleClick={handleClick}
            />
          );
        })}
      </section>
    </main>
  );
};

export default ArabicTest;
