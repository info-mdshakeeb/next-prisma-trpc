import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false
      },
      role: {
        required: false,
        defaultValue: "USER",
        type: ["USER", "ADMIN", "SUPERADMIN"],
      },
    }
  },
  rateLimit: {
    enabled: true,
    window: 20,
    max: 100
  },
  plugins: [nextCookies()]
});


export type IUser = typeof auth.$Infer.Session.user
export type ISession = typeof auth.$Infer.Session.session
export type IErrorCode = keyof typeof auth.$ERROR_CODES;