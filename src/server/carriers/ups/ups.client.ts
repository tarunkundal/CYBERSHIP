import { TokenManager } from "../../auth/token-manager";
import { env } from "../../config/env";
import { CarrierError } from "../../errors/carrier-error";
import { HttpClient } from "../../lib/http-client";
import { UpsRateResponse } from "./ups.types";

export class UpsRateClient {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly tokenManager: TokenManager
    ) { }

    async fetchRates(payload: unknown) {
        const token = await this.tokenManager.getToken();

        try {
            return await this.httpClient.post<UpsRateResponse>(
                `${env.UPS_BASE_URL}/api/rating/v1/Shop`,
                {
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            throw new CarrierError("UPS rate request failed", message);
        }
    }
}
