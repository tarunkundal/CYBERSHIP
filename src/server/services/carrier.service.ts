import { registry } from "../carriers";
import { RateRequest } from "../domain/rate-request";

export async function getRates(request: RateRequest) {
    const carrier = registry.get("UPS");
    if (!carrier) {
        throw new Error("UPS carrier not found");
    }
    return carrier.getRates(request);
}
