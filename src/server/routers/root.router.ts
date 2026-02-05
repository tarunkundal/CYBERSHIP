import { router } from "../trpc/trpc";
import { rateRouter } from "./rate.router";

export const appRouter = router({
    rate: rateRouter,
});

export type AppRouter = typeof appRouter;
