import { Store } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";

export class GetStoreByIdUseCase {
    constructor(private repository: StoreRepositoryInterface) {}

    async execute(id: string): Promise<Store | undefined> {
        return this.repository.findById(id);
    }
}
