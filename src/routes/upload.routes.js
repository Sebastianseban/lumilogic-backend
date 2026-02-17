
import express from "express";
import { getSignedUpload } from "../controllers/upload.controller.js";

const router = express.Router();

router.get("/sign", getSignedUpload);

export default router;