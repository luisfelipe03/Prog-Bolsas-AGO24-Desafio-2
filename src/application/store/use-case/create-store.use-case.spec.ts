import { beforeAll, describe, expect, it } from "vitest";
import { CreateStoreUseCase } from "./create-store.use-case";
import { StoreInMemoryRepository } from "../../../infra/repositories/In-Memory/store-in-memory.repository";
import { InvalidZipError } from "../../../application/store/use-case/errors/invalid-zip-error";

let repository: StoreInMemoryRepository;
let createStoreUseCase: CreateStoreUseCase;

describe("CreateStoreUseCase", () => {
    beforeAll(() => {
        repository = new StoreInMemoryRepository();
        createStoreUseCase = new CreateStoreUseCase(repository);
    });

    it("should create a store", async () => {
        await createStoreUseCase.execute({
            name: "Store 1",
            phone: "(81) 99478-5412",
            zip: "55296630",
        });

        const stores = await repository.findAll();

        expect(stores).toHaveLength(1);
        expect(stores[0]).toHaveProperty("name", "Store 1");
    });

    it("should throw an error if the store name is empty", async () => {
        await expect(createStoreUseCase.execute({
            name: "",
            phone: "(81) 99478-5412",
            zip: "55296630",
        })).rejects.toThrow("Name is required");
    });

    it("should throw an error if the store phone is empty", async () => {
        await expect(createStoreUseCase.execute({
            name: "Store 1",
            phone: "",
            zip: "55296630",
        })).rejects.toThrow("Store phone cannot be empty");
    });

    it("should throw an error if the store zip is empty", async () => {
        await expect(createStoreUseCase.execute({
            name: "Store 1",
            phone: "(81) 99478-5412",
            zip: "",
        })).rejects.toThrow(new InvalidZipError());
    });
});
