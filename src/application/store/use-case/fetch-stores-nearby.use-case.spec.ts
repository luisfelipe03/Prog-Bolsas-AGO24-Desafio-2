import { beforeAll, describe, expect, it } from "vitest";
import { StoreInMemoryRepository } from "../../../infra/repositories/In-Memory/store-in-memory.repository";
import { CreateStoreUseCase } from "./create-store.use-case";
import { FetchStoresNearbyUseCase } from "./fetch-stores-nearby.use-case";

let repository: StoreInMemoryRepository;
let findStoresNearby: FetchStoresNearbyUseCase;
let createStoreUseCase: CreateStoreUseCase;
describe("Fetch Stores Nearby Use Case", () => {
    beforeAll(() => {
        repository = new StoreInMemoryRepository();
        findStoresNearby = new FetchStoresNearbyUseCase(repository);
        createStoreUseCase = new CreateStoreUseCase(repository);
    });

    it("should return stores nearby", async () => {
        await createStoreUseCase.execute({
            name: "Store 1",
            phone: "(81) 99478-5412",
            zip: "55296630",
        });

        await createStoreUseCase.execute({
            name: "Store Salvador",
            phone: "(74) 99478-5412",
            zip: "41820-910",
        });

        const zip = "55296630";
        const output = await findStoresNearby.execute(zip);
        expect(output).toEqual({
            addressClient: {
                street: "Rua Francisco Gueiros",
                neighborhood: "Heliópolis",
                city: "Garanhuns",
                state: "PE",
                zip: "55296-630",
            },
            count: 1,
            stores: [
                {
                    name: "Store 1",
                    phone: "(81) 99478-5412",
                    street: "Rua Francisco Gueiros",
                    neighborhood: "Heliópolis",
                    city: "Garanhuns",
                    state: "PE",
                    zip: "55296-630",
                    distance: "0.0KM",
                },
            ],
        });
    });
});
