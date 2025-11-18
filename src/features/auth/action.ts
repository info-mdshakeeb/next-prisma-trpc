"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Password is required"),
  callback: z.union([z.string(), z.array(z.string())]).optional(),
});

type LoginInput = z.infer<typeof LoginSchema>;

type LoginResponse =
  | {
    ok: true;
    user: Awaited<ReturnType<typeof auth.api.signInEmail>>["user"];
  }
  | {
    ok: false;
    message: string;
  };

export async function loginAction(input: LoginInput): Promise<LoginResponse> {
  const { email, password } = LoginSchema.parse(input);
  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return {
      ok: true,

      user: res.user,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to sign in right now. Please try again.";

    return {
      ok: false,
      message,
    };
  }
}

// logout action
export async function logoutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    return {
      ok: true,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to sign out right now. Please try again.";
    return {
      ok: false,
      message,
    };
  }
}