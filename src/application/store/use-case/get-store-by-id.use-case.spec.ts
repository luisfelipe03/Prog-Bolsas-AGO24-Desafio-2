import { beforeAll, describe, expect, it } from "vitest";
import { StoreInMemoryRepository } from "../../../infra/repositories/In-Memory/store-in-memory.repository";
import { GetStoreByIdUseCase } from "./get-store-by-id.use-case";
import { Store } from "../../../domain/store/store.entity";

let repository: StoreInMemoryRepository;
let findStoreByIdUseCase: GetStoreByIdUseCase;

describe("Get Store By Id UseCase", () => {
    beforeAll(() => {
        repository = new StoreInMemoryRepository();
        findStoreByIdUseCase = new GetStoreByIdUseCase(repository);
    });

    it("should find a store by id", async () => {
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

        const storeFound = await findStoreByIdUseCase.execute(store.id);

        expect(storeFound).toHaveProperty("name", "Store 1");
    });

    it("should throw an error if the store is not found", async () => {
        try {
            await findStoreByIdUseCase.execute(
                "f70a1be1-c858-4a62-be67-94eacfc88b6e"
            );
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty("message", "Store not found");
        }
    });
});
