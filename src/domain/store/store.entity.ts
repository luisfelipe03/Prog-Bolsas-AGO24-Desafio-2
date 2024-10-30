import { randomUUID } from "crypto";

export type LatLng = {
    lat: number;
    lng: number;
};

export type Address = {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    latLng: LatLng; 
};

export type StoreProps = {
    name: string;
    phone: string;
    address: Address;
};

export class Store {
    public readonly id: string;
    public props!: Required<StoreProps>;

    constructor(props: StoreProps, id?: string) {
        this.id = id || randomUUID();
        this.create(props); 
    }

    private create(props: StoreProps) {
        const trimmedName = props.name.trim();
        if (trimmedName.length === 0) {
            throw new Error("Store name cannot be empty");
        }

        const trimmedPhone = props.phone.trim();
        if (trimmedPhone.length === 0) {
            throw new Error("Store phone cannot be empty");
        }

        const phoneRegex = /^[0-9\s()+-]*$/; // Permite dígitos, espaços e caracteres como (), + e -
        if (!phoneRegex.test(trimmedPhone)) {
            throw new Error(
                "Store phone can only contain digits, spaces, and characters like () and +-"
            );
        }

        if (trimmedPhone.length < 10) {
            throw new Error("Store phone must be at least 10 digits long");
        }

        const { street, neighborhood, city, state, zip, latLng } = props.address;

        if (!street || !neighborhood || !city || !state || !zip) {
            throw new Error("All address fields must be provided");
        }

        if (latLng && (typeof latLng.lat !== "number" || typeof latLng.lng !== "number")) {
            throw new Error("Latitude and longitude must be numbers");
        }

        this.props = {
            name: trimmedName,
            phone: trimmedPhone,
            address: {
                street,
                neighborhood,
                city,
                state,
                zip,
                latLng, 
            },
        };
    }

    updateName(name: string) {
        const trimmedName = name.trim();

        if (trimmedName.length === 0) {
            throw new Error("Store name cannot be empty");
        }

        this.props.name = trimmedName;
    }

    updatePhone(phone: string) {
        const trimmedPhone = phone.trim();

        if (trimmedPhone.length === 0) {
            throw new Error("Store phone cannot be empty");
        }

        const phoneRegex = /^[0-9\s()+-]*$/; // Permite dígitos, espaços e caracteres como (), + e -
        if (!phoneRegex.test(trimmedPhone)) {
            throw new Error(
                "Store phone can only contain digits, spaces, and characters like () and +-"
            );
        }

        if (trimmedPhone.length < 10) {
            throw new Error("Store phone must be at least 10 digits long");
        }

        this.props.phone = trimmedPhone;
    }

    updateAddress(address: Address) {
        const { street: addr, neighborhood, city, state, zip, latLng } = address;

        if (!addr || !neighborhood || !city || !state || !zip) {
            throw new Error("All address fields must be provided");
        }

        if (latLng && (typeof latLng.lat !== "number" || typeof latLng.lng !== "number")) {
            throw new Error("Latitude and longitude must be numbers");
        }

        this.props.address = {
            street: addr,
            neighborhood,
            city,
            state,
            zip,
            latLng, 
        };
    }

    get name() {
        return this.props.name;
    }

    get phone() {
        return this.props.phone;
    }

    get address() {
        return this.props.address;
    }

    get latLng() {
        return this.props.address.latLng;
    }

    toJSON() {
        return {
            id: this.id,
            ...this.props,
        };
    }
}
