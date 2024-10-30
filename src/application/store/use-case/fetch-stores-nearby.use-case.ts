import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import { getAddressByCEP } from "../../../infra/http/external/viaCEP";
import { FindStoreNearbyOutput } from "../dto/find-store-nearby-output.dto";
import { AddressNotFoundError } from "./errors/address-not-found-error";

export class FetchStoresNearbyUseCase {
    constructor(private repository: StoreRepositoryInterface) {}

    async execute(zip: string): Promise<FindStoreNearbyOutput> {
        const addressClient = await getAddressByCEP(zip);

        if (!addressClient) {
            throw new AddressNotFoundError();
        }

        const stores = await this.repository.findStoresNearby(
            addressClient.latLng
        );

        return {
            addressClient: {
                street: addressClient.street,
                neighborhood: addressClient.neighborhood,
                city: addressClient.city,
                state: addressClient.state,
                zip: addressClient.zip,
            },
            count: stores.length,
            stores: stores,
        };
    }
}
