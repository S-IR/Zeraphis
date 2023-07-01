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
import { api } from "~/utils/api";

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
      email: string;
      image?: string;
      emailVerified: Date | null;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    image: string | null;
    emailVerified: Date | null;
  }
}

export type AuthOption = "credentials" | "google" | "discord";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          emailVerified: token.emailVerified,
        },
      };
    },

    // signIn: async ({ user, account, profile }) => {
    //   console.log(user); // user data
    //   console.log(account); // provider account data
    //   console.log(profile); // raw profile data from provider
    //   return true; // return true to continue the sign in process
    // },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: env.JWT_SECRET,
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
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || user.password === null) {
          // If the user doesn't exist, return null to indicate a failed authentication
          return null;
        }
        // Add logic here to look up the user from the credentials supplied
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (isPasswordValid) {
          const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image, // assuming user.image is the profile image
            emailVerified: user.emailVerified, // assuming emailVerified indicates email confirmation
          };

          return Promise.resolve(userData);
        } else {
          return null;
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
  secret: env.JWT_SECRET,
  pages: {
    signIn: "/",
    signOut: "/authenticate?form=login",
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
