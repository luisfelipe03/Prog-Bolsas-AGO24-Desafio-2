import { Store, LatLng, StoreProps } from "../../../domain/store/store.entity";
import { StoreRepositoryInterface } from "../../../domain/store/store.repository";
import logger from "../../config/logger";
import { storeNearby } from "../../util/storeNearby";
import { db, StoreRow } from "./connectSQLite";
import { seedSqlite } from "./seed-sqlite";

export class StoreSqliteRepository implements StoreRepositoryInterface {
    constructor() {
        this.createTable();
    }

    private createTable(): void {
        const query = `
            CREATE TABLE IF NOT EXISTS Store (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                street TEXT NOT NULL,
                neighborhood TEXT NOT NULL,
                city TEXT NOT NULL,
                state TEXT NOT NULL,
                zip TEXT NOT NULL,
                lat REAL NOT NULL,   
                lng REAL NOT NULL    
            );`;

        db.run(query, (err) => {
            if (err) {
                logger.error("Erro ao criar a tabela store:", err.message);
            }
        });
    }

    async save(store: Store): Promise<void> {
        const { id, props } = store;
        const { name, phone, address } = props;
        const { street, neighborhood, city, state, zip, latLng } = address;

        const query = `
            INSERT INTO Store (id, name, phone, street, neighborhood, city, state, zip, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        await db.run(
            query,
            [
                id,
                name,
                phone,
                street,
                neighborhood,
                city,
                state,
                zip,
                latLng.lat,
                latLng.lng,
            ],
            (err) => {
                if (err) {
                    logger.error("Erro ao inserir a store:", err.message);
                } else {
                    logger.info("Store inserida com sucesso.");
                }
            }
        );
    }

    async findAll(page?: number): Promise<Store[]> {
        const ITEMS_PER_PAGE = 10;
    
        const query = page
            ? `SELECT * FROM Store LIMIT ${ITEMS_PER_PAGE} OFFSET ${(page - 1) * ITEMS_PER_PAGE};`
            : `SELECT * FROM Store;`;
    
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    logger.error("Erro ao buscar todas as stores:", err.message);
                    reject(err);
                } else {
                    const stores = rows.map((row: any) => {
                        const {
                            id,
                            name,
                            phone,
                            street,
                            neighborhood,
                            city,
                            state,
                            zip,
                            lat,
                            lng,
                        } = row;
                        const store = new Store(
                            {
                                name: name,
                                phone: phone,
                                address: {
                                    street: street,
                                    neighborhood: neighborhood,
                                    city: city,
                                    state: state,
                                    zip: zip,
                                    latLng: { lat: lat, lng: lng },
                                },
                            },
                            id
                        );
                        return store;
                    });
                    resolve(stores);
                }
            });
        });
    }
    

    async findById(id: string): Promise<Store | undefined> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Store WHERE id = ?";

            db.get(query, [id], (err, row: StoreRow) => {
                if (err) {
                    logger.error("Erro ao buscar loja pelo ID:", err.message);
                    reject(err);
                } else if (row) {
                    const store = new Store(
                        {
                            name: row.name,
                            phone: row.phone,
                            address: {
                                street: row.street,
                                neighborhood: row.neighborhood,
                                city: row.city,
                                state: row.state,
                                zip: row.zip,
                                latLng: {
                                    lat: row.lat,
                                    lng: row.lng,
                                },
                            },
                        },
                        row.id
                    );

                    resolve(store);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    async findByState(state: string): Promise<Store[] | undefined> {
        const query = `SELECT * FROM Store WHERE state = ?;`;

        return new Promise((resolve, reject) => {
            db.all(query, [state], (err, rows) => {
                if (err) {
                    logger.error(
                        "Erro ao buscar todas as stores:",
                        err.message
                    );
                    reject(err);
                } else {
                    const stores = rows.map((row: any) => {
                        const {
                            id,
                            name,
                            phone,
                            street,
                            neighborhood,
                            city,
                            state,
                            zip,
                            lat,
                            lng,
                        } = row;
                        const store = new Store(
                            {
                                name: name,
                                phone: phone,
                                address: {
                                    street: street,
                                    neighborhood: neighborhood,
                                    city: city,
                                    state: state,
                                    zip: zip,
                                    latLng: { lat: lat, lng: lng },
                                },
                            },
                            id
                        );
                        return store;
                    });
                    resolve(stores);
                }
            });
        });
    }

    async findStoresNearby(clientLatLng: LatLng): Promise<any[]> {
        const query = `SELECT * FROM Store;`;

        const stores: any[] = await new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    logger.error(
                        "Erro ao buscar todas as stores:",
                        err.message
                    );
                    reject(err);
                } else {
                    const stores = rows.map((row: any) => {
                        const {
                            id,
                            name,
                            phone,
                            street,
                            neighborhood,
                            city,
                            state,
                            zip,
                            lat,
                            lng,
                        } = row;
                        const store = new Store(
                            {
                                name: name,
                                phone: phone,
                                address: {
                                    street: street,
                                    neighborhood: neighborhood,
                                    city: city,
                                    state: state,
                                    zip: zip,
                                    latLng: { lat: lat, lng: lng },
                                },
                            },
                            id
                        );
                        return store;
                    });
                    resolve(stores);
                }
            });
        });

        return storeNearby(stores, clientLatLng);
    }

    async update(store: Store): Promise<Store> {
        const query = `
                UPDATE Store SET 
                    name = ?, 
                    phone = ?, 
                    street = ?, 
                    neighborhood = ?, 
                    city = ?, 
                    state = ?, 
                    zip = ?, 
                    lat = ?, 
                    lng = ?
                WHERE id = ?;
            `;

        const { street, neighborhood, city, state, zip, latLng } =
            store.address;
        await new Promise((_resolve, reject) => {
            db.run(
                query,
                [
                    store.name,
                    store.phone,
                    street,
                    neighborhood,
                    city,
                    state,
                    zip,
                    latLng.lat,
                    latLng.lng,
                    store.id,
                ],
                (err) => {
                    if (err) {
                        logger.error("Error updating store:", err.message);
                        reject(err);
                    } else {
                        logger.info("Store updated successfully");
                    }
                }
            );
        });

        return store;
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM Store WHERE id = ?;`;

        await db.run(query, [id], (err) => {
            if (err) {
                logger.error("Erro ao deletar a store:", err.message);
            } else {
                logger.info("Store deletada com sucesso.");
            }
        });
    }

    public runSeed(): void {
        seedSqlite();
    }
}
