import {describe, expect, it} from 'vitest';
import { getCoordinatesByAddress } from './googleGeocoding';

describe('Test of integration with Geoconding API', () => {
  it('should return the coordinates of a given address', async () => {
    const address = "rua francisco gueiros, heliopolis, garanhuns, pernambuco, brasil";
    const coordinates = await getCoordinatesByAddress(address);

    expect(coordinates).toEqual({
      "lat": -8.8846718,
      "lng": -36.4755754
    });
  });
});