import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ✅ MISSING IMPORT (IMPORTANT)

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "admin",
    },
    refreshToken: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// ---------------------------------------------
// PRE SAVE HOOK
// ---------------------------------------------
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// ---------------------------------------------
// INSTANCE METHODS
// ---------------------------------------------
AdminSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

AdminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
    },
  );
};

AdminSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  });
};

export const Admin = mongoose.model("Admin", AdminSchema);
