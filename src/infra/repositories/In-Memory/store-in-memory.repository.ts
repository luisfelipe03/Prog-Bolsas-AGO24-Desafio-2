import { Store, LatLng } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import { storeNearby } from "../../util/storeNearby";
import { seedInMemory } from "./seed-in-memory";

export class StoreInMemoryRepository implements StoreRepositoryInterface {
    public stores: Store[] = [];

    async save(store: Store): Promise<void> {
        this.stores.push(store);
    }

    async findAll(page?: number): Promise<Store[]> {
        return page ? this.stores.slice((page - 1) * 10, page * 10): this.stores;
    }

    async findById(id: string): Promise<Store | undefined> {
        return this.stores.find((store) => store.id === id);
    }

    async findByState(state: string): Promise<Store[] | undefined> {
        return this.stores.filter((store) => store.address.state === state);
    }

    async findStoresNearby(clientLatLng: LatLng): Promise<any[]> {
        const stores = this.stores;

        return storeNearby(stores, clientLatLng);
    }

    async update(storeUpdate: Store): Promise<Store> {
        const storeIndex = this.stores.findIndex(
            (store) => store.id === storeUpdate.id
        );

        this.stores[storeIndex] = storeUpdate;

        return storeUpdate;
    }

    async delete(id: string): Promise<void> {
        this.stores = this.stores.filter((store) => store.id !== id);
    }

    public runSeed(): void {
        seedInMemory(this.stores);
    }
    
}
