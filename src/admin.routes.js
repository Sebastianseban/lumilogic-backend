import express from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { verifyAdminAccessToken } from "../middleware/adminAuth.middleware.js";

const router = express.Router();

// -----------------------------
// AUTH
// -----------------------------
router.post("/login", loginAdmin);

// -----------------------------
// PROTECTED ROUTES (examples)
// -----------------------------
// router.post("/pages", verifyAdminAccessToken, createPage);
// router.put("/pages/:id", verifyAdminAccessToken, updatePage);
// router.delete("/pages/:id", verifyAdminAccessToken, deletePage);

// router.post("/categories", verifyAdminAccessToken, createCategory);
// router.put("/categories/:id", verifyAdminAccessToken, updateCategory);
// router.delete("/categories/:id", verifyAdminAccessToken, deleteCategory);

export default router;
