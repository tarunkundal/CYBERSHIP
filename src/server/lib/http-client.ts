export interface HttpClient {
    post<T>(
        url: string,
        options: {
            body?: string;
            headers?: Record<string, string>;
        }
    ): Promise<T>;
}

export class FetchHttpClient implements HttpClient {
    async post<T>(
        url: string,
        options: {
            body?: string;
            headers?: Record<string, string>;
        }
    ): Promise<T> {
        const res = await fetch(url, {
            method: "POST",
            headers: options.headers,
            body: options.body,
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`HTTP ${res.status}: ${text}`);
        }

        return res.json() as Promise<T>;
    }
}
