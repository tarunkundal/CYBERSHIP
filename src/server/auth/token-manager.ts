import { AuthError } from "../errors/auth-error";

type TokenResponse = {
    access_token: string;
    expires_in: number;
};

export class TokenManager {
    private token?: string;
    private expiresAt = 0;
    private refreshPromise?: Promise<string>;

    constructor(
        private readonly fetchToken: () => Promise<TokenResponse>
    ) { }

    async getToken(): Promise<string> {
        const now = Date.now();

        // Token still valid
        if (this.token && now < this.expiresAt) {
            return this.token;
        }

        // Prevent token storm
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = this.refresh();

        try {
            return await this.refreshPromise;
        } finally {
            this.refreshPromise = undefined;
        }
    }

    private async refresh(): Promise<string> {
        try {
            const res = await this.fetchToken();

            // refresh 60 seconds early
            const buffer = 60_000;

            this.token = res.access_token;
            this.expiresAt = Date.now() + res.expires_in * 1000 - buffer;

            return this.token;
        } catch (err) {
            throw new AuthError(`UPS OAuth token acquisition failed. ${(err as Error).message}`);
        }
    }
}
