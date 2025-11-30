import { APIError } from "better-auth"
import { IErrorCode } from "./auth"

export const parseError = (error: unknown): string => {
  if (error instanceof APIError) {
    const errorCode = error.body ? (error.body.code as IErrorCode) : "UNKNOWN_ERROR"
    switch (errorCode) {
      case "USER_ALREADY_EXISTS":
        return "User already exists."
      default:
        return error.message
    }
  }
  if (error instanceof Error) {
    return error.message
  }
  return "An unknown error occurred."
}