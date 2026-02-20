import nodemailer from "nodemailer";
import {
  ENQUIRY_FROM_EMAIL,
  ENQUIRY_TO_EMAIL,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from "../config/config.js";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const createTransporter = () => {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ENQUIRY_TO_EMAIL) {
    throw new Error(
      "SMTP configuration is incomplete. Please set SMTP_HOST, SMTP_USER, SMTP_PASS and ENQUIRY_TO_EMAIL."
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

export const sendEnquiryEmail = async ({ enquiry }) => {
  const transporter = createTransporter();

  const subject = `New enquiry from ${enquiry.fullName} (${enquiry.serviceTitle || enquiry.serviceSlug})`;
  const from = ENQUIRY_FROM_EMAIL || SMTP_USER;

  const text = `
New enquiry received

Name: ${enquiry.fullName}
Work Email: ${enquiry.workEmail}
Company: ${enquiry.company || "-"}
Service Interest: ${enquiry.serviceTitle || enquiry.serviceSlug}
Service Slug: ${enquiry.serviceSlug}
Project Details: ${enquiry.projectDetails}
Source: ${enquiry.source}
IP Address: ${enquiry.ipAddress || "-"}
User Agent: ${enquiry.userAgent || "-"}
Submitted At: ${new Date(enquiry.createdAt).toISOString()}
`.trim();

  const html = `
<h2>New Enquiry Received</h2>
<p><strong>Name:</strong> ${escapeHtml(enquiry.fullName)}</p>
<p><strong>Work Email:</strong> ${escapeHtml(enquiry.workEmail)}</p>
<p><strong>Company:</strong> ${escapeHtml(enquiry.company || "-")}</p>
<p><strong>Service Interest:</strong> ${escapeHtml(
    enquiry.serviceTitle || enquiry.serviceSlug
  )}</p>
<p><strong>Service Slug:</strong> ${escapeHtml(enquiry.serviceSlug)}</p>
<p><strong>Project Details:</strong><br>${escapeHtml(enquiry.projectDetails).replace(
    /\n/g,
    "<br>"
  )}</p>
<p><strong>Source:</strong> ${escapeHtml(enquiry.source)}</p>
<p><strong>IP Address:</strong> ${escapeHtml(enquiry.ipAddress || "-")}</p>
<p><strong>User Agent:</strong> ${escapeHtml(enquiry.userAgent || "-")}</p>
<p><strong>Submitted At:</strong> ${escapeHtml(
    new Date(enquiry.createdAt).toISOString()
  )}</p>
`.trim();

  await transporter.sendMail({
    from,
    to: ENQUIRY_TO_EMAIL,
    replyTo: enquiry.workEmail,
    subject,
    text,
    html,
  });
};
