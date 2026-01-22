import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import customersRouter from "./routes/customers.js";
import managersRouter from "./routes/managers.js";
import ownersRouter from "./routes/owners.js";
import vehiclesRouter from "./routes/vehicles.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/customers", customersRouter);
app.use("/api/managers", managersRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/vehicles", vehiclesRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
