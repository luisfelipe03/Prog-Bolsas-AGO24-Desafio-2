import { Router } from "express";
import {
  createStore,
  getStore,
  getStoreById,
  getStoreByState,
  getStoresNearby,
} from "../controllers/storeController";
const router = Router();

export default router
  .get("/", getStore)
  .get("/:id", getStoreById)
  .get("/find/:cep", getStoresNearby)
  .get("/state/:state", getStoreByState)
  .post("/create", createStore);
