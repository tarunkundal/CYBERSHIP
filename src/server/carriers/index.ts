import { TokenManager } from "../auth/token-manager";
import { FetchHttpClient } from "../lib/http-client";
import { CarrierRegistry } from "./carrier.registry";
import { UPSCarrier } from "./ups/ups.carrier";
import { UpsRateClient } from "./ups/ups.client";
import { fetchUpsOAuthToken } from "./ups/ups.oauth";

const httpClient = new FetchHttpClient();

const upsTokenManager = new TokenManager(() =>
    fetchUpsOAuthToken(httpClient)
);

const upsRateClient = new UpsRateClient(
    httpClient,
    upsTokenManager
);

const registry = new CarrierRegistry();

registry.register("UPS", new UPSCarrier(upsRateClient));

export { CarrierRegistry, registry };
