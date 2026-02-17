import { Admin } from "../models/Admin.js";

export const seedAdmin = async () => {
  try {
    // Optional: clear existing admins
    await Admin.deleteMany();
    console.log("Deleted existing admins");

    const admin = await Admin.create({
      email: "admin@lumilogic.com",
      password: "Admin@123", // 🔐 will be hashed automatically
      role: "admin",
      isActive: true,
    });

    console.log("✅ Admin seeded successfully");
    console.log("📧 Email:", admin.email);

    return admin;
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    throw error;
  }
};