import express from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { verifyAdminAccessToken } from "../middleware/adminAuth.middleware.js";
import { createPage, deletePage, getAllPages, getPageById, updatePage } from "../controllers/page.controller.js";
import { createCategory, deleteCategory, getCategoryById, getCategoryTree, updateCategory } from "../controllers/category.controller.js";
import {
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
} from "../controllers/enquiry.controller.js";

const router = express.Router();

// -----------------------------
// AUTH
// -----------------------------
router.post("/login", loginAdmin);

// -----------------------------


router.post("/pages", verifyAdminAccessToken, createPage);
router.put("/pages/:id", verifyAdminAccessToken, updatePage);
router.get("/pages", verifyAdminAccessToken, getAllPages);
router.get("/pages/:id", verifyAdminAccessToken, getPageById);
router.delete("/pages/:id", verifyAdminAccessToken, deletePage);

router.get("/enquiries", verifyAdminAccessToken, getAllEnquiries);
router.get("/enquiries/:id", verifyAdminAccessToken, getEnquiryById);
router.patch("/enquiries/:id/status", verifyAdminAccessToken, updateEnquiryStatus);

router.post("/categories", verifyAdminAccessToken, createCategory);
router.put("/categories/:id", verifyAdminAccessToken, updateCategory);
router.delete("/categories/:id", verifyAdminAccessToken, deleteCategory);

/* PUBLIC / ADMIN */
router.get("/categories", getCategoryTree);
router.get("/categories/:id", getCategoryById);

export default router;
