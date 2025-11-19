import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseError } from "./error";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}/${path}`
}

type ActionSuccess<T> = { success: true } & T;
type ActionError = { success: false; message: string };

export async function actionWrapper<T>(fn: () => Promise<T>): Promise<ActionSuccess<T> | ActionError> {
  try {
    const data = await fn();
    return { success: true, ...data };
  } catch (error) {
    return {
      success: false,
      message: parseError(error),
    };
  }
}