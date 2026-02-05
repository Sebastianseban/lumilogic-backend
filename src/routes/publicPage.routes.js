import express from "express";
import {
  getPageBySlug,
  getPublishedPages,
} from "../controllers/publicPage.controller.js";

const router = express.Router();

// Public routes
router.get("/pages", getPublishedPages);
router.get("/pages/:slug", getPageBySlug);

export default router;