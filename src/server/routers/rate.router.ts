import { z } from "zod";
import { RateRequest } from "../domain/rate-request";
import { RateRequestSchema } from "../domain/schemas";
import { getRates } from "../services/carrier.service";
import { publicProcedure, router } from "../trpc/trpc";

export const rateRouter = router({
    getRates: publicProcedure
        .input(
            z.object({
                carrier: z.string(),
                request: RateRequestSchema,
            })
        )
        .query(async ({ input }: { input: { carrier: string; request: RateRequest } }) => {
            return getRates(input.request);
        }),
});
