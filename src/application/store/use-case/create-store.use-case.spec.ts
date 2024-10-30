import { beforeAll, describe, expect, it } from "vitest";
import { CreateStoreUseCase } from "./create-store.use-case";
import { StoreInMemoryRepository } from "../../../infra/repositories/In-Memory/store-in-memory.repository";
import { ZodError } from "zod";

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
        try {
            await createStoreUseCase.execute({
                name: "",
                phone: "(81) 99478-5412",
                zip: "55296630",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(ZodError);
        }
    });

    it("should throw an error if the store phone is empty", async () => {
        try {
            await createStoreUseCase.execute({
                name: "Store 1",
                phone: "",
                zip: "55296630",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
                "message",
                "Store phone cannot be empty"
            );
        }
    });

    it("should throw an error if the store zip is empty", async () => {
        try {
            await createStoreUseCase.execute({
                name: "Store 1",
                phone: "(81) 99478-5412",
                zip: "",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty("message", "Invalid Zip. Please provide a valid zip code.");
        }
    });
});
