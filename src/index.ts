import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/database";
import adminRoutes from "./routes/adminRoutes";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import globalRoutes from "./routes/customerRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

// untuk path di environment postman
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customer', globalRoutes);

app.listen(port, () => {
	console.log(`"Server": Server is running at http://localhost:${port}`);
});
