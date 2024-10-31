import { Store, LatLng } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import { storeNearby } from "../../util/storeNearby";
import { client } from "./connectMongo";
import { seedMongo } from "./seed-mongo";

export class StoreMongoRepository implements StoreRepositoryInterface {
    async save(store: Store): Promise<void> {
        await client.db().collection("stores").insertOne(store);
    }

    async findAll(page?: number): Promise<Store[]> {
        const ITEMS_PER_PAGE = 10;

        const query = client.db().collection("stores").find();

        if (page) {
            const skip = (page - 1) * ITEMS_PER_PAGE;
            query.skip(skip).limit(ITEMS_PER_PAGE);
        }

        const stores = await query.toArray();
        return stores.map((store: any) => new Store(store.props, store.id));
    }

    async findById(id: string): Promise<Store | undefined> {
        const store = await client.db().collection("stores").findOne({ id });
        if (!store) return undefined;
        return new Store(store.props, store.id);
    }

    async findByState(state: string): Promise<Store[] | undefined> {
        const stores = await client
            .db()
            .collection("stores")
            .find({ "props.address.state": state })
            .toArray();

        if (!stores || stores.length === 0) return undefined;
        return stores.map((store: any) => new Store(store.props, store.id));
    }

    async findStoresNearby(clientLatLng: LatLng): Promise<any[]> {
        const document = await client
            .db()
            .collection("stores")
            .find()
            .toArray();
        const stores = document.map(
            (store: any) => new Store(store.props, store.id)
        );

        return storeNearby(stores, clientLatLng);
    }

    async update(storeUpdate: Store): Promise<Store> {
        const document = await client
            .db()
            .collection("stores")
            .findOne({ id: storeUpdate.id });

        if (!document) {
            throw new Error("Store not found");
        }

        await client
            .db()
            .collection("stores")
            .updateOne({ id: storeUpdate.id }, { $set: storeUpdate });

        return storeUpdate;
    }

    async delete(id: string): Promise<void> {
        await client.db().collection("stores").deleteOne({ id });
    }

    public runSeed(): void {
        seedMongo();
    }
}
