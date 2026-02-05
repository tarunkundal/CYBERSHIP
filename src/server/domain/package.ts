import { z } from "zod";
import { PackageSchema } from "./schemas";

export type Package = z.infer<typeof PackageSchema>;
