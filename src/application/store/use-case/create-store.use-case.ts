import { Store } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import { getAddressByCEP } from "../../../infra/http/external/viaCEP";
import {
    CreateStoreDTO,
    validateCreateStoreInput,
} from "../dto/create-store-input.dto";
import { CreateStoreOutput } from "../dto/create-store-output.dto";
import { InvalidZipError } from "./errors/invalid-zip-error";

export class CreateStoreUseCase {
    constructor(private repository: StoreRepositoryInterface) {}

    async execute(input: CreateStoreDTO): Promise<CreateStoreOutput> {
        const validatedInput = validateCreateStoreInput(input);

        const { name, phone, zip } = validatedInput;
        const address = await getAddressByCEP(zip);

        if (!address) {
            throw new InvalidZipError();
        }

        const store = new Store({ name, phone, address });

        await this.repository.save(store);

        return this.mapToOutput(store);
    }

    private mapToOutput(store: Store): CreateStoreOutput {
        return {
            id: store.id, 
            name: store.name,
            phone: store.phone,
            address: {
                street: store.address.street,
                neighborhood: store.address.neighborhood,
                city: store.address.city,
                state: store.address.state,
                zip: store.address.zip,
                latLng: store.address.latLng,
            },
        };
    }
}
