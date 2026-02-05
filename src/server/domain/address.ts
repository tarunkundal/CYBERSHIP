import { z } from "zod";
import { AddressSchema } from "./schemas";

export type Address = z.infer<typeof AddressSchema>;
