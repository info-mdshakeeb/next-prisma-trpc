"use client";
import { useQueryStates } from "nuqs";
import { authParams } from "../server/params";

export const useUsersParams = () => {
  return useQueryStates(authParams)
}