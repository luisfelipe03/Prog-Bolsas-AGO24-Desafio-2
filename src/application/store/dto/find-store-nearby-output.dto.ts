import { Store } from "../../../domain/store/store.entity";

export type FindStoreNearbyOutput = {
    addressClient: {
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zip: string;
    };
    count: number;
    stores: Store[];
};