import { env } from "../../config/env";
import { HttpClient } from "../../lib/http-client";
import { AuthError } from "../../errors/auth-error";

type UpsOAuthResponse = {
    access_token: string;
    expires_in: number;
};

export async function fetchUpsOAuthToken(
    httpClient: HttpClient
): Promise<UpsOAuthResponse> {
    try {
        const credentials = Buffer.from(
            `${env.UPS_CLIENT_ID}:${env.UPS_CLIENT_SECRET}`
        ).toString("base64");

        const body = new URLSearchParams({
            grant_type: "client_credentials",
        }).toString();

        return await httpClient.post<UpsOAuthResponse>(
            `${env.UPS_BASE_URL}/security/v1/oauth/token`,
            {
                body,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${credentials}`,
                },
            }
        );
    } catch (err) {
        throw new AuthError(
            "Failed to acquire UPS OAuth token",
        );
    }
}
