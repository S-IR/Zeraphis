import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { profileRouter } from "./routers/profile";
import { arabicRouter } from "./routers/arabic-";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  profile: profileRouter,
  arabic: arabicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
