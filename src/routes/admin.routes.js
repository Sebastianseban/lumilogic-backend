import express from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { verifyAdminAccessToken } from "../middleware/adminAuth.middleware.js";
import { createPage, deletePage, getAllPages, updatePage } from "../controllers/page.controller.js";

const router = express.Router();

// -----------------------------
// AUTH
// -----------------------------
router.post("/login", loginAdmin);

// -----------------------------


router.post("/pages", verifyAdminAccessToken, createPage);
router.put("/pages/:id", verifyAdminAccessToken, updatePage);
router.get("/pages", verifyAdminAccessToken, getAllPages);
router.delete("/pages/:id", verifyAdminAccessToken, deletePage);

// router.post("/categories", verifyAdminAccessToken, createCategory);
// router.put("/categories/:id", verifyAdminAccessToken, updateCategory);
// router.delete("/categories/:id", verifyAdminAccessToken, deleteCategory);

export default router;
