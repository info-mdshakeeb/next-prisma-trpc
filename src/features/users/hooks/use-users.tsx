"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUsersParams } from "./use-users-params";

export const useSuspenseUsers = () => {
  const trpc = useTRPC();
  const [params] = useUsersParams();
  return useSuspenseQuery(trpc.users.all.queryOptions(params));
};
