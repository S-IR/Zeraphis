import { createServerSideHelpers } from "@trpc/react-query/server";
import { Session } from "next-auth";
import SuperJSON from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

export const generateSSGHelper = (session : Session | null  = null)=> {
  
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session },
    transformer: SuperJSON,
  });


  return ssg
}