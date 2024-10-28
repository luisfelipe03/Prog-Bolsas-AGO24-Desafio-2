import app from "./app";
import { env } from "./config/env";
import connect from "./db/connection";

app.listen(env.PORT, () => {
    connect();
    console.log(`Server is running on port ${env.PORT}`);
});
