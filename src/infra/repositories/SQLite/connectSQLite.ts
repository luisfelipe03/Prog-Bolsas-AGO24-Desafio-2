import sqlite3 from "sqlite3";
import logger from "../../config/logger";

const DB_NAME = "./db/database.db";

const db = new sqlite3.Database(DB_NAME, (err) => {
    if (err) {
        logger.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        logger.info("Conectado ao banco de dados SQLite:", DB_NAME);
    }
});

export { db };

export interface StoreRow {
    id: string;
    name: string;
    phone: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lng: number;
}
