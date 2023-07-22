import { NextPage } from "next";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useTransition, animated } from "react-spring";
import AudioPlayer from "~/components/general/AudioPlayer";
import {
  DrawSlide,
  IntroductionSlide,
  LetterProgression,
  PronunciationSlide,
  QuizQuestionSlide,
  TextQuestionSlide,
} from "~/components/general/ws";
import { wsSlide } from "~/server/api/routers/arabic/arabicTexts";
import { api } from "~/utils/api";

const Page: NextPage = () => {
  const { data: slides, isLoading } =
    api.arabic.texts.getWSLearnSlides.useQuery(
      { requestedSymbolIndex: 0 },
      { staleTime: 3600 }
    );

  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
  // const slides = undefined;
  // const isLoading = undefined;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = slides !== undefined ? slides[currentSlideIndex] : null;

  const transitions = useTransition(slide, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const quizSlidesCount = useMemo(() => {
    if (!slides) return 0;
    return slides.filter(
      (slide) =>
        slide.type === "quiz-question" || slide.type === "text-question"
    ).length;
  }, [slides]);
  const [score, setScore] = useState(100);
  const incrementSlide = () => {
    if (slides !== undefined && currentSymbolIndex >= slides.length - 1) {
      //
    } else {
      setCurrentSlideIndex((v) => v + 1);
    }
  };
  const decreaseScore = () => setScore((prev) => prev - 100 / quizSlidesCount);
  const determineSlideUI = useCallback(
    (slide: wsSlide) => {
      switch (slide.type) {
        case "drawing":
          return (
            <DrawSlide
              currentSlideIndex={currentSlideIndex}
              incrementSlide={incrementSlide}
              slide={slide}
            />
          );
        case "introduction":
          return (
            <IntroductionSlide
              slide={slide}
              currentSlideIndex={currentSlideIndex}
              incrementSlide={incrementSlide}
            />
          );
        case "pronunciation":
          return <PronunciationSlide />;
        case "quiz-question":
          return (
            <QuizQuestionSlide
              currentSlideIndex={currentSlideIndex}
              decreaseScore={decreaseScore}
              incrementSlide={incrementSlide}
              slide={slide}
            />
          );
        case "text-question":
          return <TextQuestionSlide />;
      }
    },
    [currentSlideIndex, slide]
  );
  if (!slides || isLoading)
    return (
      <main className="flex h-screen w-screen items-center justify-center align-middle ">
        <PuffLoader />
      </main>
    );

  return (
    <div className=" flex h-auto min-h-[calc(100vh-75px)] w-screen items-center justify-center align-middle ">
      <main className="relative mx-[5vw] my-[5vh] flex min-h-[80vh] w-[90vw] items-center justify-center overflow-clip  rounded-3xl border-8 border-[#9DD] align-middle  ">
        <Image
          src={"/arabic/writing-system/learn/blueflr.png"}
          alt={"blue flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src={"/arabic/writing-system/learn/blueflr.png"}
          alt={"blue flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
        />
        <Image
          src={"/arabic/writing-system/learn/blueflr.png"}
          alt={"blue flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
        />
        <Image
          src={"/arabic/writing-system/learn/blueflr.png"}
          alt={"blue flower decoration for the page"}
          quality={100}
          width={225}
          height={225}
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
        />
        <LetterProgression
          currentSlideIndex={currentSlideIndex}
          lang={"ar"}
          currentSymbolIndex={currentSymbolIndex}
        />
        {transitions((style, slide) => (
          <animated.div
            style={style}
            className={"absolute left-0 top-0 h-full w-full"}
          >
            <p className="absolute right-0 top-1/2  flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan-300 align-middle text-xl  text-cyan-300   ">
              {`  ${currentSlideIndex + 1} / ${slides.length}`}
            </p>
            {slide && determineSlideUI(slide)}
          </animated.div>
        ))}
      </main>
    </div>
  );
};

export default Page;
