import { env } from "@/env";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,

  plugins: [inferAdditionalFields<typeof auth>()],
})