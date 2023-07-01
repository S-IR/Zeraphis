import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

const registerCredentialSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .nullish(),
});
export const authRouter = createTRPCRouter({
  registerCredential: publicProcedure
    .input(registerCredentialSchema)
    .mutation(async ({ input: { email, password, username }, ctx }) => {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A user with that email address already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      await ctx.prisma.user.create({
        data: { email, name: username, password: hashedPassword },
      });
      return { email, password };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
