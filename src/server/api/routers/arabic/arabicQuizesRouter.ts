import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

export const wsQuestionSchema = z.object({
  text: z.string().min(1),
  a: z.string().min(1),
  b: z.string().min(1),
  c: z.string().min(1),
  d: z.string().min(1),
  rightAns: z.enum(["a", "b", "c", "d"]),
});

export type wsQuestion = z.infer<typeof wsQuestionSchema>;

export const arabicQuizzesRouter = createTRPCRouter({
  //WORK IN PROGRESS. ONLY A MOCKUP RES

  getWSQuiz: publicProcedure
    .output(z.array(wsQuestionSchema))
    .query(async ({ ctx }) => {
      return [
        {
          text: "ف",
          a: "a",
          b: "f",
          c: "d",
          d: "w",
          rightAns: "a",
        },
      ];
    }),
});
