import { authRouter } from '@/features/procedure';
import { createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  auth: authRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;