import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await connectDB();

		const server = app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});

		const shutdown = async (signal) => {
			console.log(`${signal} received. Shutting down gracefully...`);
			server.close(async () => {
				await mongoose.connection.close(false);
				process.exit(0);
			});
		};

		process.on("SIGINT", () => shutdown("SIGINT"));
		process.on("SIGTERM", () => shutdown("SIGTERM"));
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

startServer();
