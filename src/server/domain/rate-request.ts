import { z } from "zod";
import { RateRequestSchema } from "./schemas";

export type RateRequest = z.infer<typeof RateRequestSchema>;
