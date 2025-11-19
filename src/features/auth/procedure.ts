import { auth } from '@/lib/auth';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import z from 'zod';

export const authRouter = createTRPCRouter({
  updateUser: baseProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, phone } = input;
      return await auth.api.updateUser({
        body: { name, phone },
      });
    }),
});
// export type definition of API
export type AuthRouter = typeof authRouter;