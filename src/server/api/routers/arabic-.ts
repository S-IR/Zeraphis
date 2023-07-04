import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { arabicTextsRouter } from "./arabic/arabicTexts";
import { arabicVideosRouter } from "./arabic/arabicVideos";
import { arabicQuizzesRouter } from "./arabic/arabicQuizesRouter";

export const usernameSchema = z
  .string()
  .min(4, "Username must be at least 4 characters long");

export const arabicRouter = createTRPCRouter({
  texts: arabicTextsRouter,
  quizzes: arabicQuizzesRouter,
  videos: arabicVideosRouter,
});
