import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
export const SMTP_SECURE = process.env.SMTP_SECURE === "true";
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
export const ENQUIRY_TO_EMAIL = process.env.ENQUIRY_TO_EMAIL;
export const ENQUIRY_FROM_EMAIL = process.env.ENQUIRY_FROM_EMAIL;
