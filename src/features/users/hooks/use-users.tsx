"use client";

import { useTRPC } from "@/trpc/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useUsersParams } from "./use-users-params";

export const useUsers = () => {
  const trpc = useTRPC();
  const [params] = useUsersParams();
  return useQuery({
    ...trpc.users.all.queryOptions(params),
    placeholderData: keepPreviousData,
  });
};
