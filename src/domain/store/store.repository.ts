import { LatLng, Store } from "./store.entity";

export interface StoreRepositoryInterface {
    save(store: Store): Promise<void>;
    findAll(page?: number, limit?: number): Promise<Store[]>;
    findById(id: string): Promise<Store | undefined>;
    findByState(state: string): Promise<Store[] | undefined>;
    findStoresNearby(clientLatLng: LatLng): Promise<any[]>;
    update(storeUpdate: Store): Promise<Store>;
    delete(id: string): Promise<void>;
    runSeed(): void;
}