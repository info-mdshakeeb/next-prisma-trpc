import { auth } from '@/lib/auth';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import z from 'zod';

export const authRouter = createTRPCRouter({
  updateUser: baseProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name } = input;
      return await auth.api.updateUser({
        body: { name }
      });
    })
});
// export type definition of API
export type AuthRouter = typeof authRouter;