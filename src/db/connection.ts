import mongoose from "mongoose";
import { env } from "../config/env";

async function connect() {
    try {
        await mongoose.connect(env.DATABASE_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

export default connect;
