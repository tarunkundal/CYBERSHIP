import { RateRequest } from "../../domain/rate-request";

export function mapToUpsPayload(req: RateRequest) {
    return {
        RateRequest: {
            Shipment: {
                Shipper: {
                    Address: {
                        PostalCode: req.shipper.postalCode,
                        CountryCode: req.shipper.country,
                    },
                },
                ShipTo: {
                    Address: {
                        PostalCode: req.recipient.postalCode,
                        CountryCode: req.recipient.country,
                    },
                },
            },
        },
    };
}
