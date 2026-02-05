import { z } from "zod";
import { RateQuoteSchema } from "./schemas";

export type RateQuote = z.infer<typeof RateQuoteSchema>;
