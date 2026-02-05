import { Carrier } from "./carrier.interface";

export class CarrierRegistry {
    private carriers: Map<string, Carrier> = new Map();

    register(name: string, carrier: Carrier) {
        this.carriers.set(name, carrier);
    }

    get(name: string): Carrier | undefined {
        return this.carriers.get(name);
    }
}
