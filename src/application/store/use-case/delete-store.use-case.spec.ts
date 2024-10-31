import { beforeAll, describe, expect, it } from 'vitest';
import { DeleteStoreUseCase } from './delete-store.use-case';
import { StoreInMemoryRepository } from '../../../infra/repositories/In-Memory/store-in-memory.repository';
import { Store } from '../../../domain/store/store.entity';

let repository: StoreInMemoryRepository;
let deleteStoreUseCase: DeleteStoreUseCase;

describe('DeleteStoreUseCase', () => {

    beforeAll(() => {
        repository = new StoreInMemoryRepository();
        deleteStoreUseCase = new DeleteStoreUseCase(repository);
    })

    it('should delete a store', async () => {
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

        await deleteStoreUseCase.execute(store.id);

        const stores = await repository.findAll();

        expect(stores).toHaveLength(0);
    });

    it('should throw an error if the store is not found', async () => {
        try {
            await deleteStoreUseCase.execute('f70a1be1-c858-4a62-be67-94eacfc88b6e');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', 'Store not found');
        }
    });
});