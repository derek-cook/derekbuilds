import { z } from "zod";
import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  pool: publicProcedure
    .input(
      z.object({
        topic: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      // create embedding
      // check if similar embedding exists to a close enough degree
      // if so, return the id/name of the embedding so the client can join that channel
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
