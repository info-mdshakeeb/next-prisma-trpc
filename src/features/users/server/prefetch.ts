import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";


type Input = inferInput<typeof trpc.users.all>

export const prefetchUsers = (input: Input) => {
  return prefetch(trpc.users.all.queryOptions(input));
}