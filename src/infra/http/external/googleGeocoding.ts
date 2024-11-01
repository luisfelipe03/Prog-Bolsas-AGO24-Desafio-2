import fetch from "node-fetch";
import { env } from "../../config/env";
import { LatLng } from "../../../domain/store/store.entity";
import logger from "../../config/logger";

function validateGoogleGeocodingResponse(data: any): data is { results: { geometry: { location: LatLng } }[]; status: string } {
    if (
        typeof data !== "object" ||
        !Array.isArray(data.results) ||
        typeof data.status !== "string"
    ) {
        return false;
    }

    for (const result of data.results) {
        if (
            typeof result !== "object" ||
            typeof result.geometry !== "object" ||
            typeof result.geometry.location !== "object" ||
            typeof result.geometry.location.lat !== "number" ||
            typeof result.geometry.location.lng !== "number"
        ) {
            return false;
        }
    }

    return true;
}

export const getCoordinatesByAddress = async (
    address: string
): Promise<LatLng | null> => {
    const encodedAddress = encodeURIComponent(address);

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${env.GOOGLE_API_KEY}`
        );
        const data = await response.json();

        if (!validateGoogleGeocodingResponse(data)) {
            logger.error("Error validating Google API data.");
            return null;
        }

        if (data.status !== "OK" || data.results.length === 0) {
            logger.error("Error: No results found or issue with the request.");
            return null;
        }

        const { lat, lng } = data.results[0].geometry.location;

        return { lat, lng };
    } catch (error) {
        logger.error("Error fetching coordinates:", error);
        return null;
    }
};
