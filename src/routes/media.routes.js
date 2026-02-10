// routes/media.routes.js
import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post("/cloudinary-signature", (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "lumilogic",
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder: "lumilogic",
  });
});

export default router;