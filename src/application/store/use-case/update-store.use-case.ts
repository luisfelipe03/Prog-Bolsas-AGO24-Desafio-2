import { Store } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import { getAddressByCEP } from "../../../infra/http/external/viaCEP";
import { UpdateStoreDTO } from "../dto/update-store.dto";
import { InvalidZipError } from "./errors/invalid-zip-error";
import { StoreNotFoundError } from "./errors/store-not-found-error";

export class UpdateStoreUseCase {
    constructor(private repository: StoreRepositoryInterface) {}

    async execute(input: UpdateStoreDTO): Promise<Store> {
        const { id, name, phone, zip } = input;

        const store = await this.repository.findById(id);

        if (!store) {
            throw new StoreNotFoundError();
        }

        if (store.address.zip !== zip) {
            const newAddress = await getAddressByCEP(zip);
            if (!newAddress) {
                throw new InvalidZipError();
            }
            store.updateAddress(newAddress);
        }

        if (store.name !== name) {
            store.updateName(name);
        }

        if (store.phone !== phone) {
            store.updatePhone(phone);
        }

        await this.repository.update(store);

        return store;
    }
}
