import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    workEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: 160,
    },
    serviceSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    serviceTitle: {
      type: String,
      trim: true,
      default: "",
      maxlength: 160,
    },
    servicePageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      default: null,
    },
    projectDetails: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed", "spam"],
      default: "new",
    },
    source: {
      type: String,
      default: "website",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
    emailNotification: {
      status: {
        type: String,
        enum: ["pending", "sent", "failed"],
        default: "pending",
      },
      sentAt: {
        type: Date,
        default: null,
      },
      error: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

EnquirySchema.index({ status: 1, createdAt: -1 });
EnquirySchema.index({ workEmail: 1, createdAt: -1 });

export const Enquiry = mongoose.model("Enquiry", EnquirySchema);
