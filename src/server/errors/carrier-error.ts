import { AppError } from "./app-error";

export class CarrierError extends AppError {
    constructor(message: string, code = "CARRIER_ERROR") {
        super(message, code, true);
    }
}
