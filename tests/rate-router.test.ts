import { describe, it, expect, vi } from "vitest";
import { UPSCarrier } from "../carriers/ups/ups.carrier";
import * as client from "../carriers/ups/ups.client";

describe("UPS Carrier", () => {
    it("normalizes rate response", async () => {
        vi.spyOn(client, "fetchUpsRates").mockResolvedValue({
            RateResponse: {
                RatedShipment: [
                    {
                        Service: { Code: "03" },
                        TotalCharges: {
                            MonetaryValue: "12.50",
                            CurrencyCode: "USD",
                        },
                    },
                ],
            },
        });

        const carrier = new UPSCarrier();

        const rates = await carrier.getRates({
            shipper: {
                street1: "A",
                city: "B",
                state: "C",
                postalCode: "10001",
                country: "US",
            },
            recipient: {
                street1: "X",
                city: "Y",
                state: "Z",
                postalCode: "90001",
                country: "US",
            },
            packages: [{ weight: 1, length: 1, width: 1, height: 1 }],
        });

        expect(rates[0].carrier).toBe("UPS");
    });
});
