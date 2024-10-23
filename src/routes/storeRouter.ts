import { Router } from "express";
import {
  createStore,
  deleteStore,
  getStore,
  getStoreById,
  getStoreByState,
  getStoresNearby,
  updateStore,
} from "../controllers/storeController";
const router = Router();

export default router
  .get("/", getStore)
  .get("/:id", getStoreById)
  .get("/find/:cep", getStoresNearby)
  .get("/state/:state", getStoreByState)
  .post("/create", createStore)
  .put("/:id", updateStore)
  .delete("/:id", deleteStore);
