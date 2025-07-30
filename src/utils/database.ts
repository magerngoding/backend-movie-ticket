import mongoose from "mongoose";

export default function connectDB() {
    const DATABASE_URL = process.env.DATABASE_URL ?? '';

    try {
        mongoose.connect(DATABASE_URL);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    const dbCon = mongoose.connection;

    dbCon.on('open', (_) => {
        console.log(`"Database" connected ${DATABASE_URL}`);
    });

    dbCon.on('error', (err) => {
        console.log(`Connection Error: ${err}`);
    });

    if (!DATABASE_URL) {
        console.error("DATABASE_URL is not defined in .env");
        process.exit(1);
    }
}