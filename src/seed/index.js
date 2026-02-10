import mongoose from "mongoose";
import { seedCategories } from "./category.seed.js";

import { MONGODB_URI } from "../config/config.js";
import { seedPages } from "./page.seed.js";

const runSeed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");

    const categories = await seedCategories();
    await seedPages(categories);

    console.log("🌱 Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

runSeed();