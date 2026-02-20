import express from "express";
import {
  getPageBySlug,
  getPublishedPages,
} from "../controllers/publicPage.controller.js";
import { submitEnquiry } from "../controllers/enquiry.controller.js";

const router = express.Router();

// Public routes
router.get("/pages", getPublishedPages);
router.get("/pages/:slug", getPageBySlug);
router.post("/enquiries", submitEnquiry);

export default router;
