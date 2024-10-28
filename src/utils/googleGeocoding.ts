import fetch from "node-fetch";
import { z } from "zod";
import { env } from "../config/env";

const googleGeocodingResponseSchema = z.object({
    results: z.array(
        z.object({
            geometry: z.object({
                location: z.object({
                    lat: z.number(),
                    lng: z.number(),
                }),
            }),
        })
    ),
    status: z.string(),
});

interface Coordinates {
    latitude: number;
    longitude: number;
}

export const getCoordinatesByAddress = async (
    address: string
): Promise<Coordinates | null> => {
    const encodedAddress = encodeURIComponent(address);

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${env.GOOGLE_API_KEY}`
        );
        const data = await response.json();

        const parsedData = googleGeocodingResponseSchema.safeParse(data);

        if (!parsedData.success) {
            console.error(
                "Erro na validação dos dados da API Google:",
                parsedData.error
            );
            return null;
        }

        if (
            parsedData.data.status !== "OK" ||
            parsedData.data.results.length === 0
        ) {
            console.error(
                "Erro: Nenhum resultado encontrado ou problema com a requisição"
            );
            return null;
        }

        const { lat, lng } = parsedData.data.results[0].geometry.location;

        return {
            latitude: lat,
            longitude: lng,
        };
    } catch (error) {
        console.error("Erro ao buscar as coordenadas:", error);
        return null;
    }
};
