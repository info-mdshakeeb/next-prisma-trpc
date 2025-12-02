import { PAGINATION } from '@/config/constants'
import { auth } from '@/lib/auth'
import { protectedProcedure } from '@/trpc/init'
import { TRPCRouterRecord } from '@trpc/server'
import { z } from 'zod'

export const userRouter = {
  all: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        perPage: z.number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PER_PAGE),
        search: z.string().trim().default(''),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, perPage, search } = input

      const { total, users } = await auth.api.listUsers({
        query: {
          limit: perPage,
          searchValue: search || undefined,
          offset: (page - 1) * perPage,
          searchField: "email",
          sortBy: "createdAt",
          searchOperator: "contains"
        },
        headers: ctx.headers
      }
      )



      const totalPages = Math.ceil(total / perPage);

      return {
        items: users,
        page,
        perPage,
        totalCount: total,
        totalPages,
      }
    }),
} satisfies TRPCRouterRecord