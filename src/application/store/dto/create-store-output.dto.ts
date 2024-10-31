export type CreateStoreOutput = {
    id: string;
    name: string;
    phone: string;
    address: {
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zip: string;
        latLng: {
            lat: number;
            lng: number;
        };
    };
};