import { Store } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";

export class FetchStoresByStateUseCase {
    constructor(private repository: StoreRepositoryInterface) {}

    async execute(state: string): Promise<Store[] | undefined> {
        return this.repository.findByState(state);
    }
}
