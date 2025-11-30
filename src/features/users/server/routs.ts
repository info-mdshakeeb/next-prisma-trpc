import { PAGINATION } from '@/config/constants'
import prisma from '@/lib/db'
import { protectedProcedure } from '@/trpc/init'
import { TRPCRouterRecord } from '@trpc/server'
import { z } from 'zod'

export const userRouter = {
  all: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PER_PAGE),

        search: z.string().trim().default(''),
      })
    )
    .query(async ({ input }) => {
      const { page, pageSize, search } = input
      const where =
        search && search.length > 0
          ? {
            OR: [
              { email: { contains: search, mode: 'insensitive' as const } },
              { name: { contains: search, mode: 'insensitive' as const } },
            ],
          }
          : undefined

      const [items, totalCount] = await Promise.all([
        prisma.user.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.user.count({ where }),
      ])

      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
      }
    }),
} satisfies TRPCRouterRecord