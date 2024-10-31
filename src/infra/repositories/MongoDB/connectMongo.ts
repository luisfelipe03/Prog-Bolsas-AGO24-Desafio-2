import { MongoClient } from "mongodb";
import logger from "../../config/logger";

const url = "mongodb://localhost:27017/desafio-uol";

const client = new MongoClient(url);

async function connect() {
    try {
        await client.connect();
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error("Error connecting to MongoDB: ", error);
    }
}

connect();

export { client };
