import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useTransition, animated } from "react-spring";
import { AnswerButton } from "~/components/arabic";
import { QuizButtonStatus } from "~/components/arabic/AnswerButton";
import { QuizOptionIndex, QuizOptionIndexes } from "~/constants/arabic/quizzes";
import { api } from "~/utils/api";
import { findDifferentLetters } from "~/utils/fullstack/process-text";

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
  const wrongLettersMap = new Map<string, number>();
  const [selectedAnswer, setSelectedAnswer] = useState<QuizOptionIndex | null>(
    null
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  let wrongAnswersCount = 0;
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);

  useEffect(() => {
    console.log("data", questions);
  }, [questions]);

  const currentQuestion =
    questions === undefined ? undefined : questions[currentQuestionIndex];

  useEffect(() => {
    console.log(`wrongLettersMap`, wrongLettersMap);
  }, [wrongAnswersCount]);

  const transitions = useTransition(
    currentQuestion === undefined ? "" : currentQuestion.text,
    {
      from: { opacity: 0, transform: `translateX(-30%) translateY(-50%)` },
      enter: { opacity: 1, transform: `translateX(-50%) translateY(-50%)` },
      leave: { opacity: 0, transform: `translateX(-70%) translateY(-50%)` },
    }
  );
  if (status === "loading" || currentQuestion === undefined)
    return (
      <main className="flex h-screen w-full items-center justify-center align-middle">
        <PuffLoader size={50} />
      </main>
    );

  if (status === "unauthenticated" && !ignoreUnauthenticated)
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
          <h1>
            It seems like you do not have an account<br></br>
            Your progress cannot be saved if you do not have an account. Do you
            wish to proceed anyway?
          </h1>
          <button className="h-12 w-24 rounded-lg bg-orange-600">
            Continue
          </button>
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
      }
      if (option !== currentQuestion.rightAnswer) {
        const wrongLetters = findDifferentLetters(
          currentQuestion[option],
          currentQuestion[currentQuestion.rightAnswer]
        );
        wrongLetters.forEach((letter) => {
          if (!wrongLettersMap.has(letter)) {
            wrongLettersMap.set(letter, 1);
          } else {
            const count = wrongLettersMap.get(letter) as number;
            wrongLettersMap.set(letter, count + 1);
          }
        });
        wrongAnswersCount++;
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
              className="absolute left-1/2 top-1/2 text-[192px] text-black "
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
                disabled={isTimeoutActive}
                status={correctStatus}
                text={currentQuestion[option]}
                handleClick={handleClick}
              />
            );
          })}
          {/* <button className="flex flex-grow items-center justify-center rounded-xl bg-[#FFEC97] align-middle text-4xl shadow-lg shadow-black ">
            {currentQuestion.a}
          </button>
          <button className="flex flex-grow items-center justify-center rounded-xl bg-[#FFEC97] align-middle text-4xl shadow-lg shadow-black ">
            {currentQuestion.b}
          </button>
          <button className="flex flex-grow items-center justify-center rounded-xl bg-[#FFEC97] align-middle text-4xl shadow-lg shadow-black ">
            {currentQuestion.c}
          </button>
          <button className="flex flex-grow items-center justify-center rounded-xl bg-[#FFEC97] align-middle text-4xl shadow-lg shadow-black ">
            {currentQuestion.d}
          </button> */}
        </section>
      </main>
    </>
  );
};

export default Page;
