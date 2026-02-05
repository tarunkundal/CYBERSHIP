import { RateRequest } from "../domain/rate-request";
import { RateQuote } from "../domain/rate-quote";

export interface Carrier {
    getRates(request: RateRequest): Promise<RateQuote[]>;
}
