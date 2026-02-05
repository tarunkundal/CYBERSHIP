export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public retryable = false
    ) {
        super(message);
    }
}
