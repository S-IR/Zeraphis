import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useTransition } from "react-spring";
import { api } from "~/utils/api";

const Page: NextPage = () => {
  const { data, status, update } = useSession();
  const { data: questions } = api.arabic.quizzes.getWSQuiz.useQuery();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = useMemo(
    () =>
      questions === undefined ? undefined : questions[currentQuestionIndex],
    [currentQuestionIndex, questions]
  );

  if (status === "loading" || currentQuestion === undefined)
    return (
      <main className="flex h-screen w-full items-center justify-center  align-middle">
        <PuffLoader size={50} />
      </main>
    );

  if (status === "unauthenticated")
    return (
      <main className="flex h-screen w-full items-center justify-center  align-middle">
        <h1></h1>
      </main>
    );

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
          <span className="text-[192px] text-black ">
            {currentQuestion.text}
          </span>
        </section>
        <section className="flex h-24 w-3/5">
          <button className="flex flex-grow items-center justify-center rounded-xl bg-[#FFEC97] align-middle text-4xl shadow-lg shadow-black ">
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
          </button>
        </section>
      </main>
    </>
  );
};

export default Page;
