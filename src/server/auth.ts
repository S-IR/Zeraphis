import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      profileImage: string;
      emailConfirmed: Date | null;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    profileImage: string | null;
    emailConfirmed: Date | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        profileImage: user.profileImage,
        emailConfirmed: user.emailConfirmed,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Enail", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || user.password === null) {
          // If the user doesn't exist, return null to indicate a failed authentication
          return Promise.resolve(null);
        }
        // Add logic here to look up the user from the credentials supplied
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (isPasswordValid) {
          return Promise.resolve({
            id: user.id,
            name: user.name,
            email: user.email,
            profileImage: user.image, // assuming user.image is the profile image
            emailConfirmed: user.emailVerified, // assuming emailVerified indicates email confirmation
          });
        } else {
          return Promise.resolve(null);
        }
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],

  pages: {
    signIn: "/authenticate",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
