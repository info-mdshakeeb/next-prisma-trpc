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
  },
  user: {
    additionalFields: {
      phone: { type: "string", optional: true, input: false },
      role: { type: ["USER", "ADMIN"] },
    }
  },
  rateLimit: {
    enabled: true,
    window: 20,
    max: 100
  },
  plugins: [nextCookies()]
});
