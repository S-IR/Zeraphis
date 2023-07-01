import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import React, { MouseEventHandler, useState } from "react";
import { api } from "~/utils/api";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { getServerAuthSession } from "~/server/auth";
import SuperJSON from "superjson";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import {
  FlashcardsTab,
  ProfileTab,
  ProgressTab,
  StudiedLanguagesTab,
} from "~/components/profile";
import { useTransition, animated } from "react-spring";

type ProfileTab = "profile" | "flashcards" | "studied-languages" | "progress";

const determineTab = (tab: ProfileTab) => {
  switch (tab) {
    case "flashcards":
      return <FlashcardsTab />;
    case "profile":
      return <ProfileTab />;
    case "progress":
      return <ProgressTab />;
    case "studied-languages":
      return <StudiedLanguagesTab />;
  }
};

const ProfilePage: NextPage<{
  userId: string;
  username: string | undefined;
}> = ({ userId, username }) => {
  const { data, isLoading } = api.profile.getByIdPrivate.useQuery({
    userId,
  });
  const [tab, setTab] = useState<ProfileTab>("profile");

  const handleTabSwitch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setTab(e.currentTarget.value as ProfileTab);

  const transitions = useTransition(tab, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>404</div>;
  return (
    <>
      <NextSeo
        title={username ? `Profile : ${username}` : `Profile`}
        description={`Profile page for ${data.email}`}
      />
      <main className="i mt-24 flex h-[calc(100vh-75px-96px)] w-full overflow-clip rounded-t-3xl border-2 border-yellow-600/20">
        <section className="flex h-full w-3/12 flex-col items-center justify-center  bg-[##15291F] bg-[#15291F] align-middle">
          <button
            onClick={handleTabSwitch}
            value={"profile"}
            className={`h-28 w-full text-2xl text-yellow-600 shadow-sm transition-all duration-300 hover:bg-white/10 ${
              tab === "profile" ? `shadow-green-700/80` : `shadow-green-700/20`
            }`}
          >
            Profile
          </button>
          <button
            onClick={handleTabSwitch}
            value={"flashcards"}
            className={`h-28 w-full text-2xl text-yellow-600 shadow-sm transition-all duration-300 hover:bg-white/10 ${
              tab === "flashcards"
                ? `shadow-green-700/80`
                : `shadow-green-700/20`
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={handleTabSwitch}
            value={"studied-languages"}
            className={`h-28 w-full text-2xl text-yellow-600 shadow-sm transition-all duration-300 hover:bg-white/10 ${
              tab === "studied-languages"
                ? `shadow-green-700/80`
                : `shadow-green-700/20`
            }`}
          >
            Studied Languages
          </button>
          <button
            onClick={handleTabSwitch}
            value={"progress"}
            className={`h-28 w-full text-2xl text-yellow-600 shadow-sm transition-all duration-300 hover:bg-white/10 ${
              tab === "progress" ? `shadow-green-700/80` : `shadow-green-700/20`
            }`}
          >
            Progress
          </button>
        </section>
        <article className="relative h-full w-full">
          {transitions((style, item) => (
            <animated.div
              style={style}
              className={"absolute left-0 top-0 h-full w-full"}
            >
              {determineTab(item)}
            </animated.div>
          ))}
        </article>
      </main>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session === null) {
    return {
      props: { trpcState: { session: null } },
    };
  }
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: null },
    transformer: SuperJSON,
  });

  await ssg.profile.getByIdPrivate.prefetch({
    userId: session.user.id,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId: session.user.id,
      username: session.user.name,
    } as const,
  };
};
