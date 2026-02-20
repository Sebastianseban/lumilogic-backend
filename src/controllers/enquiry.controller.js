import { Enquiry } from "../models/Enquiry.js";
import { Page } from "../models/Page.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEnquiryEmail } from "../utils/sendEnquiryEmail.js";

const ALLOWED_STATUS = ["new", "contacted", "closed", "spam"];

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const submitEnquiry = asyncHandler(async (req, res) => {
  const {
    fullName,
    workEmail,
    company = "",
    serviceSlug,
    serviceInterest,
    projectDetails,
  } = req.body;

  const normalizedName = String(fullName || "").trim();
  const normalizedEmail = String(workEmail || "").trim().toLowerCase();
  const normalizedCompany = String(company || "").trim();
  const normalizedDetails = String(projectDetails || "").trim();
  const normalizedServiceSlug = String(
    serviceSlug || serviceInterest || ""
  )
    .trim()
    .toLowerCase();
  const normalizedServiceInterest = String(serviceInterest || "").trim();

  if (!normalizedName || !normalizedEmail || !normalizedDetails || !normalizedServiceSlug) {
    throw new ApiError(
      400,
      "fullName, workEmail, serviceSlug/serviceInterest and projectDetails are required"
    );
  }

  if (!isValidEmail(normalizedEmail)) {
    throw new ApiError(400, "Please provide a valid workEmail");
  }

  if (normalizedName.length > 120) {
    throw new ApiError(400, "fullName must be 120 characters or fewer");
  }

  if (normalizedCompany.length > 160) {
    throw new ApiError(400, "company must be 160 characters or fewer");
  }

  if (normalizedDetails.length > 3000) {
    throw new ApiError(400, "projectDetails must be 3000 characters or fewer");
  }

  let selectedServicePage = await Page.findOne({
    slug: normalizedServiceSlug,
    isPublished: true,
  }).select("_id slug title");

  if (!selectedServicePage && normalizedServiceInterest) {
    selectedServicePage = await Page.findOne({
      title: { $regex: `^${escapeRegex(normalizedServiceInterest)}$`, $options: "i" },
      isPublished: true,
    }).select("_id slug title");
  }

  if (!selectedServicePage) {
    throw new ApiError(
      400,
      "Invalid service selection. Please select a service from the menu API."
    );
  }

  const ipAddress = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim() || req.ip || "";

  const userAgent = req.get("user-agent") || "";

  const enquiry = await Enquiry.create({
    fullName: normalizedName,
    workEmail: normalizedEmail,
    company: normalizedCompany,
    serviceSlug: selectedServicePage.slug,
    serviceTitle: selectedServicePage.title,
    servicePageId: selectedServicePage._id,
    projectDetails: normalizedDetails,
    source: "website",
    ipAddress,
    userAgent,
  });

  try {
    await sendEnquiryEmail({ enquiry });
    enquiry.emailNotification.status = "sent";
    enquiry.emailNotification.sentAt = new Date();
    enquiry.emailNotification.error = "";
    await enquiry.save();
  } catch (error) {
    enquiry.emailNotification.status = "failed";
    enquiry.emailNotification.error = error.message?.slice(0, 500) || "Unknown email error";
    await enquiry.save();
    throw new ApiError(500, "Enquiry saved but failed to send notification email");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        {
          id: enquiry._id,
          status: enquiry.status,
        },
        "Enquiry submitted successfully"
      )
    );
});

export const getAllEnquiries = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const filter = {};

  if (req.query.status) {
    const status = String(req.query.status).toLowerCase();
    if (!ALLOWED_STATUS.includes(status)) {
      throw new ApiError(400, `Invalid status. Allowed: ${ALLOWED_STATUS.join(", ")}`);
    }
    filter.status = status;
  }

  if (req.query.search) {
    const safeSearch = escapeRegex(String(req.query.search).trim());
    filter.$or = [
      { fullName: { $regex: safeSearch, $options: "i" } },
      { workEmail: { $regex: safeSearch, $options: "i" } },
      { company: { $regex: safeSearch, $options: "i" } },
      { serviceTitle: { $regex: safeSearch, $options: "i" } },
      { projectDetails: { $regex: safeSearch, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  res.json(
    new ApiResponse(
      200,
      {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Enquiries fetched successfully"
    )
  );
});

export const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  res.json(new ApiResponse(200, enquiry, "Enquiry fetched successfully"));
});

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const status = String(req.body.status || "").toLowerCase().trim();

  if (!ALLOWED_STATUS.includes(status)) {
    throw new ApiError(400, `Invalid status. Allowed: ${ALLOWED_STATUS.join(", ")}`);
  }

  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  res.json(new ApiResponse(200, enquiry, "Enquiry status updated"));
});
