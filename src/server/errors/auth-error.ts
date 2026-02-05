import { AppError } from "./app-error";

export class AuthError extends AppError {
    constructor(message = "Authentication failed") {
        super(message, "AUTH_ERROR", false);
    }
}
