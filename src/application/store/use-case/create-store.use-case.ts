import { Store } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import { getAddressByCEP } from "../../../infra/http/external/viaCEP";
import { CreateStoreDTO, CreateStoreInputDTO } from "../dto/create-store-input.dto";
import { InvalidZipError } from "./errors/invalid-zip-error";

export class CreateStoreUseCase {
    constructor(private repository: StoreRepositoryInterface) {}

    async execute(input: CreateStoreDTO): Promise<void> {
        input = CreateStoreInputDTO.parse(input);

        const { name, phone, zip } = input;
        const address = await getAddressByCEP(zip);

        if (!address) {
            throw new InvalidZipError();
        }

        const store = new Store({ name, phone, address });

        await this.repository.save(store);
    }
}
