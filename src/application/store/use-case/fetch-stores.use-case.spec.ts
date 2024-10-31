import { beforeAll, describe, expect, it } from "vitest";
import { StoreInMemoryRepository } from "../../../infra/repositories/In-Memory/store-in-memory.repository";
import { FetchStoresUseCase } from "./fetch-stores.use-case";
import { CreateStoreUseCase } from "./create-store.use-case";

let repository: StoreInMemoryRepository;
let listAllStoreUseCase: FetchStoresUseCase;
let createStoreUseCase: CreateStoreUseCase;

describe("Fetch Stores Use Case", () => {
    beforeAll(() => {
        repository = new StoreInMemoryRepository();
        listAllStoreUseCase = new FetchStoresUseCase(repository);
        createStoreUseCase = new CreateStoreUseCase(repository);
    });

    it("should return an empty list if there are no stores", async () => {
        const output = await listAllStoreUseCase.execute();
        expect(output).toEqual([]);
    });

    it("should list all stores", async () => {
        await createStoreUseCase.execute({
            name: "Store 1",
            phone: "(81) 99478-5412",
            zip: "55296630",
        });

        await createStoreUseCase.execute({
            name: "Store 2",
            phone: "(81) 99478-5412",
            zip: "55010220",
        });

        await createStoreUseCase.execute({
            name: "Store 3",
            phone: "(81) 99478-5412",
            zip: "50710375",
        });

        const output = await listAllStoreUseCase.execute();

        expect(output).toEqual([
            {
                id: expect.any(String),
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
            {
                id: expect.any(String),
                name: "Store 2",
                phone: "(81) 99478-5412",
                address: {
                    street: "Rua França Júnior",
                    neighborhood: "Centenário",
                    city: "Caruaru",
                    state: "PE",
                    zip: "55010-220",
                    latLng: { lat: -8.2814089, lng: -35.9792759 },
                },
            },
            {
                id: expect.any(String),
                name: "Store 3",
                phone: "(81) 99478-5412",
                address: {
                    street: "Rua Dom Manoel da Costa",
                    neighborhood: "Torre",
                    city: "Recife",
                    state: "PE",
                    zip: "50710-375",
                    latLng: { lat: -8.0478477, lng: -34.9117651 },
                },
            },
        ]);
    });
});
