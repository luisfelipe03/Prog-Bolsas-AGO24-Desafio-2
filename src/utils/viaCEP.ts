import fetch from "node-fetch";
import { ZodError, z } from "zod";
import logger from "../config/logger";

const viaCEPResponseSchema = z.object({
    cep: z.string(),
    logradouro: z.string(),
    complemento: z.string().optional(),
    bairro: z.string(),
    localidade: z.string(),
    uf: z.string(),
    erro: z.boolean().optional(),
});

interface Address {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
}

export const getAddressByCEP = async (cep: string): Promise<Address | null> => {
    const cleanedCep = cep.replace(/\D/g, "");

    // Verifica se o CEP é válido
    if (!cleanedCep || cleanedCep.length !== 8 || !/^\d{8}$/.test(cleanedCep)) {
        logger.error("CEP inválido ou vazio");
        return null;
    }

    try {
        const response = await fetch(
            `https://viacep.com.br/ws/${cleanedCep}/json/`
        );

        if (!response.ok) {
            logger.error(
                `Erro na requisição do ViaCEP: Status ${response.status}`
            );
            return null;
        }

        const data = await response.json();

        if (!data) {
            logger.warn(`CEP não encontrado: ${cep}`);
            return null;
        }

        const parsedData = viaCEPResponseSchema.parse(data);

        return {
            street: parsedData.logradouro,
            neighborhood: parsedData.bairro,
            city: parsedData.localidade,
            state: parsedData.uf,
            cep: parsedData.cep,
        };
    } catch (error) {
        if (error instanceof ZodError) {
            logger.error("Erro na validação dos dados da API:", error.errors);
        } else {
            logger.error("Erro ao buscar o CEP:", error);
        }
        return null;
    }
};

export const convertAddressToString = (address: Address): string => {
    return `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}`;
};
