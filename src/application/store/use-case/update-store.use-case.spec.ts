import { describe } from "node:test";
import { beforeAll, expect, it } from "vitest";
import { StoreInMemoryRepository } from "../../../infra/repositories/In-Memory/store-in-memory.repository";
import { UpdateStoreUseCase } from "./update-store.use-case";
import { Store } from "../../../domain/store/store.entity";

let repository: StoreInMemoryRepository;
let updateStoreUseCase: UpdateStoreUseCase;

describe("UpdateStoreUseCase", () => {
    beforeAll(() => {
        repository = new StoreInMemoryRepository();
        updateStoreUseCase = new UpdateStoreUseCase(repository);
    });

    it("should update a store", async () => {
        await repository.save(
            new Store(
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
            )
        );

        const store = await repository.findById(
            "f70a1be1-c858-4a62-be67-94eacfc88b6e"
        );

        const storeUpdated = await updateStoreUseCase.execute({
            id: "f70a1be1-c858-4a62-be67-94eacfc88b6e",
            name: "Store 1",
            phone: "(81) 99478-5413",
            zip: "51150-001",
        });


        expect(storeUpdated).toEqual({
            id: "f70a1be1-c858-4a62-be67-94eacfc88b6e",
            props: {
                name: "Store 1",
                phone: "(81) 99478-5413",
                address: {
                    street: "Avenida Marechal Mascarenhas de Moraes",
                    neighborhood: "Imbiribeira",
                    city: "Recife",
                    state: "PE",
                    zip: "51150-001",
                    latLng: { lat: -8.1081496, lng: -34.9116229},
                },
            },
        });
    });

    it("should throw an error when store not found", async () => {
        try {
            await updateStoreUseCase.execute({
                id: "5713a41f-57de-4df5-ab01-fbd0e74cb442",
                name: "Store 1",
                phone: "(81) 99478-5413",
                zip: "51150-001",
            });
        } catch (error) {
            const err = error as Error;
    
            expect(err).toBeInstanceOf(Error);
    
            expect(err.message).toBe("Store not found");
        }
    });
    
});
