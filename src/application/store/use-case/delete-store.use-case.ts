import { StoreRepositoryInterface } from "../../../domain/store/store.repository";

export class DeleteStoreUseCase {
    constructor(private storeRepository: StoreRepositoryInterface) {}

    async execute(id: string): Promise<void> {
        await this.storeRepository.delete(id);
    }
}
