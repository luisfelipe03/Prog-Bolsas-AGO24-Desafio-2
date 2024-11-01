import express, { Express, Request, Response } from "express";
import { storeRouter } from "../routes/store.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../config/swagger.json";
import { client } from "../../repositories/MongoDB/connectMongo";

const app: Express = express();

// Conexão com o MongoDB
// client.connect();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/store", storeRouter);

export { app };
