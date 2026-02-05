import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const verifyAdminAccessToken = asyncHandler(async (req, _res, next) => {
  // -----------------------------------
  // 1️⃣ READ AUTH HEADER
  // -----------------------------------
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token is missing or invalid");
  }

  const token = authHeader.split(" ")[1];

  // -----------------------------------
  // 2️⃣ VERIFY JWT
  // -----------------------------------
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  // -----------------------------------
  // 3️⃣ FIND ADMIN
  // -----------------------------------
  const admin = await Admin.findById(decoded._id).select(
    "-password -refreshToken"
  );

  if (!admin) {
    throw new ApiError(401, "Admin not authorized");
  }

  if (!admin.isActive) {
    throw new ApiError(403, "Admin account is disabled");
  }

  // -----------------------------------
  // 4️⃣ ATTACH ADMIN TO REQUEST
  // -----------------------------------
  req.admin = admin;

  next();
});