import { Router } from "express";
import { StoreController } from "../controllers/store.controller";
import { StoreInMemoryRepository } from "../../repositories/In-Memory/store-in-memory.repository";
import { StoreSqliteRepository } from "../../repositories/SQLite/store-sqlite.repository";
import { StoreMongoRepository } from "../../repositories/MongoDB/store-mongo.repository";


const storeRouter = Router();

// Lembrar de executar a função de conexão com o mongo quando usar o StoreMongoRepository
const repository = new StoreSqliteRepository();
repository.runSeed();

const storeController = new StoreController(repository);

storeRouter.post("/create", storeController.createStore);
storeRouter.get("/", storeController.listAllStore);
storeRouter.get("/:id", storeController.findStoreById);
storeRouter.get("/state/:state", storeController.findStoreByState);
storeRouter.get("/nearby/:zip", storeController.findStoreNearby);
storeRouter.put("/update/:id", storeController.updateStore);
storeRouter.delete("/delete/:id", storeController.deleteStore);

export { storeRouter };