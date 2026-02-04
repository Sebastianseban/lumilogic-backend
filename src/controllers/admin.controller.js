import { Admin } from "../models/Admin.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  generateAccessAndRefreshTokenForAdmin,
} from "../utils/generateAdminTokens.js";

export const loginAdmin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  // -----------------------------
  // VALIDATION
  // -----------------------------
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  email = email.toLowerCase().trim();

  // -----------------------------
  // FIND ADMIN
  // -----------------------------
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new ApiError(404, "Admin does not exist");
  }

  if (!admin.isActive) {
    throw new ApiError(403, "Admin account is disabled");
  }

  // -----------------------------
  // PASSWORD CHECK
  // -----------------------------
  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  // -----------------------------
  // TOKENS
  // -----------------------------
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenForAdmin(admin._id);

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  // -----------------------------
  // COOKIES
  // -----------------------------
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("adminRefreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { admin: loggedInAdmin, accessToken },
        "Admin logged in successfully"
      )
    );
});
