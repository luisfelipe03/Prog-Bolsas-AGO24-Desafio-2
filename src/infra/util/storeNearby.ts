import { haversineDistance } from "./haversine";
import { Store } from "../../domain/store/store.entity";
import logger from "../config/logger";
import { LatLng } from "../../domain/store/store.entity";

type StoreWithDistance = {
    name: string;
    phone: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    distance: string;
};

export const storeNearby = (
    stores: Store[],
    latLng: LatLng
): StoreWithDistance[] => {
    const accessibleStores = stores
        .map((store) => {
            const distance = haversineDistance(
                store.address.latLng.lat,
                store.address.latLng.lng,
                latLng.lat,
                latLng.lng
            ).toFixed(1);

            return {
                name: store.name,
                phone: store.phone,
                street: store.address.street,
                neighborhood: store.address.neighborhood,
                city: store.address.city,
                state: store.address.state,
                zip: store.address.zip,
                distance: `${distance}KM`,
            };
        })
        .filter((store) => parseFloat(store.distance) <= 100);

    if (accessibleStores.length === 0) {
        logger.info("No accessible stores found");
        throw new Error("No accessible stores found");
    }

    logger.info("Accessible stores retrieved successfully", {
        count: accessibleStores.length,
    });

    return accessibleStores.sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );
};
