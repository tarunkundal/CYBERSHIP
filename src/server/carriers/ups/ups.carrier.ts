import { RateQuote } from "../../domain/rate-quote";
import { RateRequest } from "../../domain/rate-request";
import { Carrier } from "../carrier.interface";
import { UpsRateClient } from "./ups.client";
import { mapToUpsPayload } from "./ups.mapper";
import { UpsRateResponse } from "./ups.types";

export class UPSCarrier implements Carrier {
    constructor(private readonly rateClient: UpsRateClient) { }

    async getRates(request: RateRequest): Promise<RateQuote[]> {
        const payload = mapToUpsPayload(request);
        const data = await this.rateClient.fetchRates(payload);

        return data.RateResponse.RatedShipment.map((r: UpsRateResponse['RateResponse']['RatedShipment'][number]) => ({
            carrier: "UPS",
            service: r.Service.Code,
            totalCharge: r.TotalCharges.MonetaryValue,
            currency: r.TotalCharges.CurrencyCode,
        }));
    }
}
