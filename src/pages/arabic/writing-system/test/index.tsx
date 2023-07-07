import { useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { useTransition, animated } from "react-spring";
import { AnswerButton } from "~/components/arabic";
import { QuizButtonStatus } from "~/components/arabic/AnswerButton";
import { QuizOptionIndex, QuizOptionIndexes } from "~/constants/arabic/quizzes";
import { FrontendFlashcard } from "~/constants/flashcards";
import { api } from "~/utils/api";
import { findDifferentLetters } from "~/utils/fullstack/process-text";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const Page: NextPage = () => {
  const { status, data, update } = useSession();
  const { data: questions } = api.arabic.quizzes.getWSQuiz.useQuery();
  const [ignoreUnauthenticated, toggleIgnore] = useState(false);
  const [wrongLettersMap, setWrongLettersMap] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  const [selectedAnswer, setSelectedAnswer] = useState<QuizOptionIndex | null>(
    null
  );

  const queryClient = useQueryClient();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);

  const [testResults, setTestResults] = useState<null | {
    flashcards: FrontendFlashcard[];
    finalScore: number;
  }>(null);

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
  const currentQuestion =
    questions === undefined ? undefined : questions[currentQuestionIndex];

  useEffect(() => {
    console.log(`wrongLettersMap`, wrongLettersMap);
  }, [wrongAnswersCount]);
  useEffect(() => {
    console.log(`questions`, questions);
  }, [questions]);
  const transitions = useTransition(
    currentQuestion === undefined ? "" : currentQuestion.text,
    {
      from: { opacity: 0, transform: `translateX(-30%) translateY(-50%)` },
      enter: { opacity: 1, transform: `translateX(-50%) translateY(-50%)` },
      leave: { opacity: 0, transform: `translateX(-70%) translateY(-50%)` },
    }
  );
  if (testResults !== null) return <ScoreResults testResults={testResults} />;

  if (status === "loading" || currentQuestion === undefined)
    return (
      <main className="flex h-screen w-full items-center justify-center align-middle">
        <PuffLoader size={50} />
      </main>
    );

  if ((status === "unauthenticated" && !ignoreUnauthenticated) || isMutating)
    return (
      <main className="flex h-screen w-full items-center justify-center  align-middle">
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
          {isMutating ? (
            <>
              <h2 className="text-4xl">Please wait</h2>
              <PuffLoader size={50} />
            </>
          ) : (
            <>
              <h1 className="text-4xl">
                It seems like you do not have an account<br></br>
                Your progress cannot be saved if you do not have an account{" "}
                <br></br>
                Do you wish to proceed anyway?
              </h1>
              <button
                onClick={() => toggleIgnore(true)}
                className="h-12 w-24 rounded-lg bg-orange-600"
              >
                Continue
              </button>
            </>
          )}
        </section>
      </main>
    );

  const handleButtonClick = (option: QuizOptionIndex) => {
    setSelectedAnswer(option);
    setIsTimeoutActive(true);

    setTimeout(() => {
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

  return (
    <>
      <NextSeo
        title="Test your Arabic Writing System Understanding"
        description="This is a test that allows you to determine how capable are you to read and understand arabic characters and map them to their equivalent latin alphabet constructions"
      />
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
    </>
  );
};

export default Page;

type scoreResultsProps = {
  testResults: { flashcards: FrontendFlashcard[]; finalScore: number };
};
const ScoreResults = ({
  testResults: { finalScore, flashcards },
}: scoreResultsProps) => {
  const { data } = useSession();

  const [open, togglePopup] = useState(false);
  return (
    <main className="relative flex h-screen w-full items-center justify-center  align-middle">
      <section className="relative flex h-[60vh] w-3/5 flex-col  items-center justify-center space-y-6 overflow-clip rounded-xl border-4 border-green-900 bg-[#FDF0B6] align-middle text-black">
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
        <h1 className="text-center ">
          <span className="text-4xl text-yellow-800 lg:text-6xl">
            {(finalScore as number) >= 75
              ? "Congratulations"
              : "You can do better!"}
          </span>
        </h1>
        <h2 className="text-2xl">
          {`You have ${
            (finalScore as number) >= 75 ? "" : "only"
          } answered ${finalScore}%  of the questions correctly`}{" "}
        </h2>
        {data && data.user ? (
          <h2>
            We have placed the letters that you had problems with in flashcards
            so that you can memorize them
          </h2>
        ) : (
          <h2>
            Since you are not logged in we will not store your flashcards and
            you will not be able to repeat them at a later time
          </h2>
        )}
        <h3 className="!my-0">
          You can still see your failed letters the letters you got the most
          wrong at the bottom
        </h3>
        <button
          onClick={() => togglePopup(true)}
          className="h-14 w-36 rounded-md bg-orange-600 text-white shadow-sm shadow-black  transition-all duration-300 hover:text-red-200 hover:shadow-none"
        >
          See letters
        </button>
      </section>
      <Modal
        open={open}
        onClose={() => togglePopup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="!absolute !left-1/2 !top-1/2 !h-auto !w-auto !max-w-[50vw] !-translate-x-1/2 !-translate-y-1/2 !bg-gradient-to-br !from-white !to-yellow-200 !shadow-lg !shadow-black">
          <div
            className={` grid h-auto w-auto grid-cols-4 `}
            style={{ gridColumn: Math.min(flashcards.length, 6) }}
          >
            {flashcards.map((card) => (
              <div
                key={card.id}
                className="flex h-32 w-32 items-center justify-center rounded-md bg-yellow-300 align-middle text-6xl"
              >
                {card.front}
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </main>
  );
};
