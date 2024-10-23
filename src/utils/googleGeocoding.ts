import fetch from 'node-fetch';
import { z } from 'zod'; 
import { env } from '../env'; 

// Definindo a estrutura da resposta da API do Google Geocoding usando Zod
const googleGeocodingResponseSchema = z.object({
  results: z.array(z.object({
    geometry: z.object({
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    }),
  })),
  status: z.string(),
});

// Interface para o retorno de latitude e longitude
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Função para obter a latitude e longitude a partir de um endereço
export const getCoordinatesByAddress = async (address: string): Promise<Coordinates | null> => {
  const encodedAddress = encodeURIComponent(address);

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${env.GOOGLE_API_KEY}`);
    const data = await response.json();
    
    // Validação da resposta da API usando Zod
    const parsedData = googleGeocodingResponseSchema.safeParse(data);

    if (!parsedData.success) {
      console.error('Erro na validação dos dados da API Google:', parsedData.error);
      return null;
    }

    if (parsedData.data.status !== 'OK' || parsedData.data.results.length === 0) {
      console.error('Erro: Nenhum resultado encontrado ou problema com a requisição');
      return null;
    }

    // Extração de latitude e longitude do primeiro resultado
    const { lat, lng } = parsedData.data.results[0].geometry.location;

    return {
      latitude: lat,
      longitude: lng,
    };
  } catch (error) {
    console.error('Erro ao buscar as coordenadas:', error);
    return null;
  }
};
