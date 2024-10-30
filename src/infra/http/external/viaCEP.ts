import fetch from "node-fetch";
import { ZodError, z } from "zod";
import logger from "../../config/logger";
import { Address } from "../../../domain/store/store.entity";
import { getCoordinatesByAddress } from "./googleGeocoding";
import { InvalidZipError } from "../../../application/store/use-case/errors/invalid-zip-error";

const viaCEPResponseSchema = z.object({
    cep: z.string(),
    logradouro: z.string(),
    complemento: z.string().optional(),
    bairro: z.string(),
    localidade: z.string(),
    uf: z.string(),
    erro: z.boolean().optional(),
});

export const getAddressByCEP = async (cep: string): Promise<Address | null> => {
    const cleanedCep = cep.replace(/\D/g, "");

    if (!cleanedCep || cleanedCep.length !== 8 || !/^\d{8}$/.test(cleanedCep)) {
        logger.error("Invalid or empty CEP");
        throw new InvalidZipError();
    }

    try {
        const response = await fetch(
            `https://viacep.com.br/ws/${cleanedCep}/json/`
        );

        if (!response.ok) {
            logger.error(`Error in ViaCEP request: Status ${response.status}`);
            throw new Error("Error fetching CEP with ViaCEP API");
        }

        const data = await response.json();

        if (!data) {
            logger.warn(`CEP not found: ${cep}`);
            throw new Error("CEP not found");
        }

        const parsedData = viaCEPResponseSchema.parse(data);

        const addressToConvert = {
            street: parsedData.logradouro,
            neighborhood: parsedData.bairro,
            city: parsedData.localidade,
            state: parsedData.uf,
            zip: parsedData.cep,
            latLng: {
                lat: 0,
                lng: 0,
            },
        };

        const addressString = convertAddressToString(addressToConvert);

        const latLng = await getCoordinatesByAddress(addressString);

        if (!latLng) {
            throw new Error(
                `Coordinates not found for address: ${addressString}`
            );
        }

        return {
            street: parsedData.logradouro,
            neighborhood: parsedData.bairro,
            city: parsedData.localidade,
            state: parsedData.uf,
            zip: parsedData.cep,
            latLng,
        };
    } catch (error) {
        if (error instanceof Error) {
            logger.error("Error validating API data:", error);
        } else {
            logger.error("Error fetching CEP:", error);
        }
        return null;
    }
};

export const convertAddressToString = (address: Address): string => {
    return `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}`;
};
