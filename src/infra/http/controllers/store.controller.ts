import { Request, Response } from "express";
import { CreateStoreUseCase } from "../../../application/store/use-case/create-store.use-case";
import { FetchStoresUseCase } from "../../../application/store/use-case/fetch-stores.use-case";
import { FetchStoresNearbyUseCase } from "../../../application/store/use-case/fetch-stores-nearby.use-case";
import { UpdateStoreUseCase } from "../../../application/store/use-case/update-store.use-case";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import { GetStoreByIdUseCase } from "../../../application/store/use-case/get-store-by-id.use-case";
import { FetchStoresByStateUseCase } from "../../../application/store/use-case/fetch-stores-by-state.use-case";
import logger from "../../config/logger";
import { DeleteStoreUseCase } from "../../../application/store/use-case/delete-store.use-case";

const handleResponse = (res: Response, statusCode: number, message: any) => {
    res.status(statusCode).json({ message });
};

export class StoreController {
    /**
     * Binding de Métodos:
     * Os métodos do controlador (createStore, listAllStore, findStoreById, etc.) são vinculados ao contexto da instância da classe (this).
     * Isso é crucial porque, em JavaScript, o valor de this pode mudar dependendo de como uma função é chamada.
     * Ao usar .bind(this), você garante que this dentro desses métodos sempre se refira à instância da classe StoreController.
     */
    constructor(private repository: StoreRepositoryInterface) {
        this.createStore = this.createStore.bind(this);
        this.listAllStore = this.listAllStore.bind(this);
        this.findStoreById = this.findStoreById.bind(this);
        this.findStoreByState = this.findStoreByState.bind(this);
        this.findStoreNearby = this.findStoreNearby.bind(this);
        this.updateStore = this.updateStore.bind(this);
        this.deleteStore = this.deleteStore.bind(this);
    }

    async createStore(req: Request, res: Response) {
        try {
            const createStoreUseCase = new CreateStoreUseCase(this.repository);
            await createStoreUseCase.execute(req.body);
            handleResponse(res, 201, "Store created successfully");
        } catch (error) {
            const err = error as Error;
            logger.error("Error creating store:", err);
            handleResponse(res, 500, err.message);
        }
    }

    async listAllStore(req: Request, res: Response) {
        try {
            const listAllStoreUseCase = new FetchStoresUseCase(this.repository);
            const page = req.query.page
                ? parseInt(req.query.page as string)
                : undefined;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
            const output = await listAllStoreUseCase.execute(page, limit);

            if (output.length === 0) {
                handleResponse(res, 404, "No stores found");
                return;
            }

            logger.info("Stores retrieved successfully", {
                count: output.length,
            });
            res.status(200).json({ count: output.length, stores: output });
        } catch (error) {
            logger.error("Error fetching stores:", error);
            handleResponse(res, 500, "Error fetching stores");
        }
    }

    async findStoreById(req: Request, res: Response) {
        try {
            const findByIdUseCase = new GetStoreByIdUseCase(this.repository);
            const store = await findByIdUseCase.execute(req.params.id);
            if (!store) {
                logger.warn(`Store not found with ID: ${req.params.id}`);
                return handleResponse(res, 404, "Store not found");
            }

            res.status(200).json(store);
        } catch (error) {
            logger.error("Error fetching store by ID:", error);
            handleResponse(res, 500, "Error fetching store");
        }
    }

    async findStoreByState(req: Request, res: Response) {
        try {
            const state = req.params.state.toUpperCase();
            const findStoreByStateUseCase = new FetchStoresByStateUseCase(
                this.repository
            );
            const stores = await findStoreByStateUseCase.execute(state);

            if (!stores || stores.length === 0) {
                logger.warn(`No stores found in state: ${state}`);
                return handleResponse(
                    res,
                    404,
                    "No stores found in this state"
                );
            }

            logger.info("Stores retrieved by state successfully", {
                count: stores.length,
            });
            res.status(200).json({ count: stores.length, stores });
        } catch (error) {
            logger.error("Error fetching stores by state:", error);
            handleResponse(res, 500, "Error fetching stores by state");
        }
    }

    async findStoreNearby(req: Request, res: Response) {
        try {
            const findStoreNearbyUseCase = new FetchStoresNearbyUseCase(
                this.repository
            );
            const output = await findStoreNearbyUseCase.execute(req.params.zip);

            if (output.count === 0) {
                logger.warn("No accessible stores found");
                return handleResponse(res, 404, "No stores found");
            }

            logger.info("Accessible stores retrieved successfully", {
                count: output.count,
            });

            res.status(200).json(output);
        } catch (error) {
            logger.error("Invalid Zip. Please provide a valid zip code.");
            handleResponse(
                res,
                500,
                "Invalid Zip. Please provide a valid zip code."
            );
        }
    }

    async updateStore(req: Request, res: Response) {
        try {
            const updateStoreUseCase = new UpdateStoreUseCase(this.repository);
            const { name, phone, zip } = req.body;
            const id = req.params.id;
            const updateStoreDTO = {
                id,
                name,
                phone,
                zip,
            };
            const output = await updateStoreUseCase.execute(updateStoreDTO);
            res.status(200).json({
                message: "Store updated successfully",
                store: output,
            });
        } catch (error) {
            logger.error("Error updating store:", error);
            handleResponse(res, 500, "Error updating store");
        }
    }

    async deleteStore(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deleteStoreUseCase = new DeleteStoreUseCase(this.repository);
            await deleteStoreUseCase.execute(id);
            logger.info("Store deleted successfully", { id });
            handleResponse(res, 200, "Store deleted successfully");
        } catch (error) {
            const err = error as Error;
            logger.error("Error deleting store:", err);
            handleResponse(res, 400, err.message);
        }
    }
}
