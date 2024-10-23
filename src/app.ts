import express from 'express';
import storeRouter from './routes/storeRouter';
import { convertAddressToString, getAddressByCEP } from './utils/viaCEP';
import { getCoordinatesByAddress } from './utils/googleGeocoding';

const app = express();

app.use(express.json());

app.use('/store', storeRouter);

export default app;