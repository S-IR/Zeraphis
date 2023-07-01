import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";
import { TRPCError } from "@trpc/server";
import { User } from "@prisma/client";
import { usernameSchema } from "./auth";

export const profileRouter = createTRPCRouter({
  getByUsername: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { name: input.username },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "no user found with that username",
        });
      }
      const { password, ...rest } = user;
      return rest;
    }),
  getByIdPublic: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.userId },
        include: { ar: true, hb: true, kn: true },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "no user found with that username",
        });
      }
      const { password, emailVerified, createdAt, ...rest } = user;
      return rest;
    }),
  getByIdPrivate: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.userId },
        include: { ar: true, hb: true, kn: true },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "no user found with that username",
        });
      }

      if (
        user.profileVisibility === "private" &&
        input.userId !== ctx.session.user.id
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have access to this resource",
        });
      } else {
        const { password, ...rest } = user;
        return rest;
      }
    }),
  changeUsername: protectedProcedure
    .input(
      z.object({
        newUsername: usernameSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.newUsername },
      });
      return name;
    }),
  changeProfileVisibility: protectedProcedure
    .input(
      z.object({
        newProfileVisibility: z.enum(["public", "private"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { profileVisibility } = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { profileVisibility: input.newProfileVisibility },
      });
      return profileVisibility;
    }),
});
