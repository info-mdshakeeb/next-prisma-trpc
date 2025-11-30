"use server";

import { auth } from "@/lib/auth";

import { actionWrapper } from "@/lib/utils";
import { headers } from "next/headers";
import { IProfileUpdateForm } from "../profile/profile-form";
import { ILoginFormValues } from "./forms/login.form";
import { IRegisterFormValues } from "./forms/register.form";


export async function loginAction(input: ILoginFormValues) {
  return actionWrapper(async () => {
    const { email, password } = input;
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

// register action
export async function registerAction(input: IRegisterFormValues) {
  return actionWrapper(async () => {
    const { name, email, password } = input;
    const res = await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await headers(),
    });
    return { user: res.user };
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