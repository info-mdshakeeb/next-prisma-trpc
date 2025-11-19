"use server";

import { auth } from "@/lib/auth";

import { actionWrapper } from "@/lib/utils";
import { headers } from "next/headers";
import { z } from "zod";
import { IProfileUpdateForm } from "../profile/profile-form";

const LoginSchema = z.object({
  email: z.email("Please provide a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginInput = z.infer<typeof LoginSchema>;


export async function loginAction(input: LoginInput) {
  return actionWrapper(async () => {
    const { email, password } = LoginSchema.parse(input);
    const res = await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
    return { user: res.user };
  });
}

// logout action
export async function logoutAction() {
  return actionWrapper(async () => {
    await auth.api.signOut({
      headers: await headers(),
    });
  });
}
// update user action
export async function updateUserAction(data: Partial<IProfileUpdateForm>) {
  return actionWrapper(async () => {
    await auth.api.updateUser({
      headers: await headers(),
      body: data,
    });
  });
}