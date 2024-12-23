import { Store } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import { CreateStoreOutput } from "../dto/create-store-output.dto";

export class FetchStoresUseCase {
    constructor(private repository: StoreRepositoryInterface) {}

    async execute(page?: number, limit?: number): Promise<CreateStoreOutput[]> {
        const stores = await this.repository.findAll(page, limit);
        return stores.map((store: Store) => store.toJSON());
    }
}
