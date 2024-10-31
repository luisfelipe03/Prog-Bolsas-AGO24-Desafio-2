import fetch from "node-fetch";
import logger from "../../config/logger";
import { Address } from "../../../domain/store/store.entity";
import { getCoordinatesByAddress } from "./googleGeocoding";
import { InvalidZipError } from "../../../application/store/use-case/errors/invalid-zip-error";

type ViaCEPResponse = {
    cep: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean | string;
};

function validateViaCEPResponse(data: any): data is ViaCEPResponse {
    return (
        typeof data === "object" &&
        data !== null &&
        typeof data.cep === "string" &&
        typeof data.logradouro === "string" &&
        typeof data.bairro === "string" &&
        typeof data.localidade === "string" &&
        typeof data.uf === "string" &&
        (data.erro === undefined || data.erro === true || data.erro === "true")
    );
}

export const getAddressByCEP = async (cep: string): Promise<Address | null> => {
    const cleanedCep = cep.replace(/\D/g, "");

    if (!cleanedCep || cleanedCep.length !== 8) {
        logger.error("Invalid or empty CEP");
        throw new InvalidZipError();
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);

        if (!response.ok) {
            logger.error(`Error in ViaCEP request: Status ${response.status}`);
            throw new Error("Error fetching CEP with ViaCEP API");
        }

        const data = await response.json();

        if (!validateViaCEPResponse(data) || (data.erro === true || data.erro === "true")) {
            logger.warn(`CEP not found or invalid: ${cep}`);
            return null;
        }

        const addressToConvert = {
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
            zip: data.cep,
            latLng: { lat: 0, lng: 0 },
        };

        const addressString = convertAddressToString(addressToConvert);
        const latLng = await getCoordinatesByAddress(addressString);

        if (!latLng) {
            throw new Error(`Coordinates not found for address: ${addressString}`);
        }

        return {
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
            zip: data.cep,
            latLng,
        };
    } catch (error) {
        logger.error(`Error searching for address with CEP ${cep}:`, error);
        return null;
    }
};

export const convertAddressToString = (address: Address): string => {
    return `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}`;
};
