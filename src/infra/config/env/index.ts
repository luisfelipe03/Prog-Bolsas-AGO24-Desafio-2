import { config } from "dotenv";
import logger from "../logger";

if (process.env.NODE_ENV === "test") {
    config({ path: ".env.test" });
} else {
    config();
}

function validateEnv() {
    const NODE_ENV = process.env.NODE_ENV || "development";
    if (!["development", "production", "test"].includes(NODE_ENV)) {
        logger.error(`NODE_ENV inválido: ${NODE_ENV}`);
        process.exit(1);
    }

    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
        logger.error("DATABASE_URL não definida");
        process.exit(1);
    }

    const PORT = Number(process.env.PORT) || 3333;
    if (isNaN(PORT)) {
        logger.error("PORT deve ser um número");
        process.exit(1);
    }

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    if (!GOOGLE_API_KEY) {
        logger.error("GOOGLE_API_KEY não definida");
        process.exit(1);
    }

    return {
        NODE_ENV,
        DATABASE_URL,
        PORT,
        GOOGLE_API_KEY,
    };
}

const env = validateEnv();

export { env };
