import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import React from "react";
import { api } from "~/utils/api";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { getServerAuthSession } from "~/server/auth";
import SuperJSON from "superjson";
import { TRPCError } from "@trpc/server";
import { useSession } from "next-auth/react";
import { generateSSGHelper } from "~/utils/backend/trpc";
import { useRouter } from "next/router";

const ProfilePage: NextPage<{ userId: string }> = ({ userId }) => {
  // const session = useSession();
  // const router = useRouter();
  // if (session.data?.user.id === userId) {
  //   router.push("/profile");
  // }
  // const { data, isLoading } = api.profile.getByIdPublic.useQuery({
  //   userId,
  //   requestingUserId: session.data?.user.id,
  // });
  // if (isLoading) return <div>Loading...</div>;

  // if (!data) return <div>404</div>;

  return <div>WORK IN PROGRESS</div>;
};

export default ProfilePage;

// export const getStaticPaths = () => {
//   return { paths: [], fallback: "blocking" };
// };

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const ssg = generateSSGHelper();

//   if (ctx.params === undefined || typeof ctx.params.userId !== "string")
//     throw new TRPCError({ code: "NOT_FOUND" });
//   const userId = ctx.params.userId;

//   const { profileVisibility } = await ssg.profile.getByIdPublic.fetch({
//     userId,
//   });

//   if (profileVisibility === "private") {
//     return {
//       props: {
//         trpcState: { profileVisibility },
//         userId,
//       },
//     };
//   } else {
//     await ssg.profile.getByIdPublic.prefetch({ userId });
//     return {
//       props: {
//         trpcState: ssg.dehydrate(),
//         userId,
//       },
//     };
//   }
// };
