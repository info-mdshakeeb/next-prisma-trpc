"use client";
import { useQueryStates } from "nuqs";
import { usersParams } from "../server/params";

export const useUsersParams = () => {
  return useQueryStates(usersParams)
}