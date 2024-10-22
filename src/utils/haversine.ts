/**
 * Fórmula de Haversine para calcular a distância entre dois pontos na superfície da Terra.
 *
 * A fórmula é dada por:
 *
 * a = sin²(Δφ/2) + cos(φ1) * cos(φ2) * sin²(Δλ/2)
 *
 * c = 2 * atan2(√a, √(1−a))
 *
 * d = R * c
 *
 * Onde:
 * - φ é a latitude em radianos,
 * - λ é a longitude em radianos,
 * - Δφ é a diferença de latitude (φ2 - φ1),
 * - Δλ é a diferença de longitude (λ2 - λ1),
 * - R é o raio da Terra (aproximadamente 6371 km),
 * - d é a distância entre os dois pontos em quilômetros.
 */
export const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Raio da Terra em quilômetros

  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distância em quilômetros
  const distance = R * c;

  return distance;
};
