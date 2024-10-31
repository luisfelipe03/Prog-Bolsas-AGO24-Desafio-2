import { env } from "../../config/env";
import logger from "../../config/logger";
import { app } from "./app";

app.listen(env.PORT, () => {
    logger.info(`Server is running at http://localhost:${env.PORT}`);
});
