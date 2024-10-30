import { describe, expect, it } from "vitest";
import { Store } from "./store.entity";

describe("StoreEntity", () => {
    it("should be able to create a new store entity", () => {
        const storeProps = {
            name: "Store Name",
            phone: "1234567890",
            address: {
                street: "Rua ABC",
                neighborhood: "Centro",
                city: "Ubatuba",
                state: "TS",
                zip: "123456789",
                latLng: {
                    lat: 0,
                    lng: 0,
                },
            },
        };

        const store = new Store(storeProps);

        expect(store.id).toBeDefined();
        expect(store.props).toEqual(storeProps);
    });

    it("should be able to update the store name", () => {
        const storeProps = {
            name: "Store Name",
            phone: "1234567890",
            address: {
                street: "Rua ABC",
                neighborhood: "Centro",
                city: "Ubatuba",
                state: "TS",
                zip: "123456789",
                latLng: {
                    lat: 0,
                    lng: 0,
                },
            },
        };

        const store = new Store(storeProps);

        store.updateName("New Store Name");

        expect(store.props.name).toBe("New Store Name");
    });

    it("should be able to update the store phone", () => {
        const storeProps = {
            name: "Store Name",
            phone: "1234567890",
            address: {
                street: "Rua ABC",
                neighborhood: "Centro",
                city: "Ubatuba",
                state: "TS",
                zip: "123456789",
                latLng: {
                    lat: 0,
                    lng: 0,
                },
            },
        };

        const store = new Store(storeProps);

        store.updatePhone("1234567890");

        expect(store.props.phone).toBe("1234567890");
    });

    it("should not be able to create a store with an empty name", () => {
        expect(() => {
            new Store({
                name: "",
                phone: "1234567890",
                address: {
                    street: "Rua ABC",
                    neighborhood: "Centro",
                    city: "Ubatuba",
                    state: "TS",
                    zip: "123456789",
                    latLng: {
                        lat: 0,
                        lng: 0,
                    },
                },
            });
        }).toThrowError("Store name cannot be empty");
    });

    it("should not be able to create a store with an empty phone", () => {
        expect(() => {
            new Store({
                name: "Store Name",
                phone: "",
                address: {
                    street: "Rua ABC",
                    neighborhood: "Centro",
                    city: "Ubatuba",
                    state: "TS",
                    zip: "123456789",
                    latLng: {
                        lat: 0,
                        lng: 0,
                    },
                },
            });
        }).toThrowError("Store phone cannot be empty");
    });

    it("should not be able to create a store with an invalid phone", () => {
        expect(() => {
            new Store({
                name: "Store Name",
                phone: "12345abc",
                address: {
                    street: "Rua ABC",
                    neighborhood: "Centro",
                    city: "Ubatuba",
                    state: "TS",
                    zip: "123456789",
                    latLng: {
                        lat: 0,
                        lng: 0,
                    },
                },
            });
        }).toThrowError(
            "Store phone can only contain digits, spaces, and characters like () and +-"
        );
    });

    it("should not be able to create a store with a phone shorter than 10 digits", () => {
        expect(() => {
            new Store({
                name: "Store Name",
                phone: "123456789",
                address: {
                    street: "Rua ABC",
                    neighborhood: "Centro",
                    city: "Ubatuba",
                    state: "TS",
                    zip: "123456789",
                    latLng: {
                        lat: 0,
                        lng: 0,
                    },
                },
            });
        }).toThrowError("Store phone must be at least 10 digits long");
    });

    it("should not be able to create a store with missing address fields", () => {
        expect(() => {
            new Store({
                name: "Store Name",
                phone: "1234567890",
                address: {
                    street: "Rua ABC",
                    neighborhood: "Centro",
                    city: "Ubatuba",
                    state: "TS",
                    zip: "",
                    latLng: {
                        lat: 0,
                        lng: 0,
                    },
                },
            });
        }).toThrowError("All address fields must be provided");
    });
});
