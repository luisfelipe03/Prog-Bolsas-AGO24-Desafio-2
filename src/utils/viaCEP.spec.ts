import {describe, expect, it} from 'vitest';
import { convertAddressToString, getAddressByCEP } from './viaCEP';

describe('viaCEP', () => {
    it('should return the address', async () => {
        const address = await getAddressByCEP('55296630');
        expect(address).toEqual({
            street: 'Rua Francisco Gueiros',
            neighborhood: 'Heliópolis',
            city: 'Garanhuns',
            state: 'PE',
            cep: '55296-630'
        })
    });

    it('should return null if the CEP is not found', async () => {
        const address = await getAddressByCEP('55415001');
        expect(address).toBeNull();
    });

    it('should return null if the CEP is invalid', async () => {
        const address = await getAddressByCEP('123a56b89');
        expect(address).toBeNull();
    });

    it('should return null if the CEP is empty', async () => {
        const address = await getAddressByCEP('');
        expect(address).toBeNull();
    });

    it('should convert the address to a string', async () => {
        const address = await getAddressByCEP('55296630'); // Use await para resolver a Promise
        if (address) {
          const addressString = convertAddressToString(address);
          expect(addressString).toBe('Rua Francisco Gueiros, Heliópolis, Garanhuns - PE');
        }
      });
      
});