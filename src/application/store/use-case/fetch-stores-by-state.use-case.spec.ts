import { beforeAll, describe, expect, it } from "vitest";
import { FetchStoresByStateUseCase } from "./fetch-stores-by-state.use-case";
import { StoreInMemoryRepository } from "../../../infra/repositories/In-Memory/store-in-memory.repository";
import { Store } from "../../../domain/store/store.entity";

let repository: StoreInMemoryRepository;
let findStoreByStateUseCase: FetchStoresByStateUseCase;

describe("Fetch Stores By State Use Case", () => {
    beforeAll(() => {
        repository = new StoreInMemoryRepository();
        findStoreByStateUseCase = new FetchStoresByStateUseCase(repository);
    });

    it("should find a store by state", async () => {
        const store = new Store(
            {
                name: "Store 1",
                phone: "(81) 99478-5412",
                address: {
                    street: "Rua Francisco Gueiros",
                    neighborhood: "Heliópolis",
                    city: "Garanhuns",
                    state: "PE",
                    zip: "55296-630",
                    latLng: { lat: -8.8846718, lng: -36.4755754 },
                },
            },
            "f70a1be1-c858-4a62-be67-94eacfc88b6e"
        );
        await repository.save(store);

        const storeFound = await findStoreByStateUseCase.execute("PE");

        expect(storeFound).toHaveLength(1);
    });

    it("should return an empty array if no store is found", async () => {
        const storeFound = await findStoreByStateUseCase.execute("SP");

        expect(storeFound).toHaveLength(0);
    });
});
