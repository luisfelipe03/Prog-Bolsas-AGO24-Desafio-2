import express from 'express';
import { convertAddressToString, getAddressByCEP } from './utils/viaCEP';
import { getCoordinatesByAddress } from './utils/googleGeocoding';

const app = express();

app.get('/:cep', async (req, res) => {
    const address = await getAddressByCEP(req.params.cep);

    if (!address) {
        res.status(404).send('CEP não encontrado');
        return;
    }

    const addressString = convertAddressToString(address);

    const coordinates = await getCoordinatesByAddress(addressString);

    if (!coordinates) {
        res.status(500).send('Erro ao buscar as coordenadas');
        return;
    }

    const fullAddress = {
        ...address,
        longitude: coordinates.longitude,
        latitude: coordinates.latitude
    };

    res.send(fullAddress);

});

export default app;