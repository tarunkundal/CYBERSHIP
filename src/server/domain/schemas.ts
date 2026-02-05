import { z } from "zod";

export const AddressSchema = z.object({
    name: z.string().optional(),
    street1: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string().length(2),
});

export const PackageSchema = z.object({
    weight: z.number().positive(),
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
});


export const RateRequestSchema = z.object({
    shipper: AddressSchema,
    recipient: AddressSchema,
    packages: z.array(PackageSchema).min(1),
    serviceCode: z.string().optional(),
});

export const MoneySchema = z.object({
    amount: z.number(),
    currency: z.string(),
});

export const RateQuoteSchema = z.object({
    carrier: z.string(),
    service: z.string(),
    totalCharge: z.string(),
    currency: z.string(),
    deliveryDays: z.string().optional(),
});

