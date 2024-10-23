import express from 'express';
import storeRouter from './routes/storeRouter';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/store', storeRouter);

app.use(errorHandler);

export default app;