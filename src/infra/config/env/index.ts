import { config } from "dotenv";
import { z } from "zod";
import logger from "../logger";

if (process.env.NODE_ENV === "test") {
    config({ path: ".env.test" });
} else {
    config();
}

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3333),
    GOOGLE_API_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    if (process.env.NODE_ENV === "test") {
        throw new Error(
            `Erro ao validar variáveis de ambiente: ${JSON.stringify(
                _env.error.errors
            )}`
        );
    } else {
        logger.error(
            "Erro ao validar variáveis de ambiente:",
            _env.error.errors
        );
        process.exit(1); 
    }
}

export const env = _env.data;
