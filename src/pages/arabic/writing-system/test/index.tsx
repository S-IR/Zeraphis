import { useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
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
import { generateSSGHelper } from "~/utils/backend/trpc";
import ArabicTest from "~/components/arabic/ArabicTest";

const Page: NextPage = () => {
  const { status, data, update } = useSession();
  const { data: infiniteData, fetchNextPage } =
    api.arabic.quizzes.getWSQuiz.useInfiniteQuery(
      { limit: 4 },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );
  const [testResults, setTestResults] = useState<null | {
    flashcards: FrontendFlashcard[];
    finalScore: number;
  }>(null);

  infiniteData?.pageParams;
  const [ignoreUnauthenticated, toggleIgnore] = useState(false);

  if (testResults !== null) return <ScoreResults testResults={testResults} />;
  if (infiniteData === undefined)
    return (
      <section className="flex h-screen w-screen items-center justify-center align-middle">
        <PuffLoader size={40} />
      </section>
    );
  if (status === "loading" || infiniteData === undefined)
    return (
      <main className="flex h-screen w-full items-center justify-center align-middle">
        <PuffLoader size={50} />
      </main>
    );

  if (status === "unauthenticated" && !ignoreUnauthenticated)
    return (
      <main className="flex h-screen w-full items-center justify-center  align-middle">
        <section className="relative flex h-[60vh] w-3/5 flex-col items-center justify-center overflow-clip rounded-xl border-4 border-green-900 bg-[#FDF0B6] align-middle text-black">
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

          <h1 className="text-center text-4xl">
            <span className="text-yellow-800">
              It seems like you do not have an account
            </span>
            <br></br>
            Your progress cannot be saved if<br></br> you do not have an account{" "}
            <br></br>
          </h1>
          <span className="my-8 text-4xl text-black/80">
            {" "}
            Do you wish to proceed anyway?
          </span>

          <button
            onClick={() => toggleIgnore(true)}
            className="h-12 w-24 rounded-sm bg-yellow-600 transition-all duration-300 hover:bg-yellow-400/50 "
          >
            Continue
          </button>
        </section>
      </main>
    );

  return (
    <>
      <NextSeo
        title="Test your Arabic Writing System Understanding"
        description="This is a test that allows you to determine how capable are you to read and understand arabic characters and map them to their equivalent latin alphabet constructions"
      />
      <ArabicTest
        setTestResults={setTestResults}
        questions={infiniteData.pages.flatMap((page) => page.questions)}
        fetchNextPage={fetchNextPage}
      />
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

  console.log("flashcards", flashcards);

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
            className={` grid h-auto w-auto  `}
            style={{ gridColumn: Math.min(flashcards.length - 1, 6) }}
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const ssg = generateSSGHelper();
//   await ssg.arabic.quizzes.getWSQuiz.prefetchInfinite({
//     limit: 4,
//   });
//   console.log("ssr ran");

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//     } as const,
//   };
// };
