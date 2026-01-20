import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || "adminpass";

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log("Seed: admin already exists");
      process.exit(0);
    }

    await User.create({
      name: "Administrator",
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 10),
      role: "admin",
    });

    console.log("Seed complete: admin created", adminEmail);
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

seed();
