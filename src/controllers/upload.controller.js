import cloudinary from "../config/cloudinary.js";

export const getSignedUpload = async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const paramsToSign = {
      timestamp,
      folder: "cms-pages",
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      success: true,
      data: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        timestamp,
        folder: "cms-pages",
        signature,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};