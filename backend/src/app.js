import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import customersRouter from "./routes/customers.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/customers", customersRouter);

export default app;
