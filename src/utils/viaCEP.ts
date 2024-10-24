import fetch from 'node-fetch'; 
import { ZodError, z } from 'zod';

const viaCEPResponseSchema = z.object({
  cep: z.string(),
  logradouro: z.string(),
  complemento: z.string().optional(),
  bairro: z.string(),
  localidade: z.string(), 
  uf: z.string(), 
  erro: z.boolean().optional() 
});

interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}


export const getAddressByCEP = async (cep: string): Promise<Address | null> => {
  const cleanedCep = cep.replace(/\D/g, '');

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    const data = await response.json();

    const parsedData = viaCEPResponseSchema.parse(data);

    if (parsedData.erro) {
      console.error('CEP não encontrado');
      return null;
    }

    return {
      street: parsedData.logradouro,
      neighborhood: parsedData.bairro,
      city: parsedData.localidade,
      state: parsedData.uf,
      cep: parsedData.cep,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Erro na validação dos dados da API:', error.errors);
    } else {
      console.error('Erro ao buscar o CEP:', error);
    }
    return null;
  }
};

export const convertAddressToString = (address: Address): string => {
  return `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}`;
}
