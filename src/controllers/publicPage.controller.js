import { Page } from "../models/Page.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

/**
 * GET /api/pages/:slug
 * Public page by slug
 */
export const getPageBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const page = await Page.findOne({
    slug,
    isPublished: true,
  }).populate("categoryId", "title slug");

  if (!page) {
    throw new ApiError(404, "Page not found");
  }

  res.json(new ApiResponse(200, page, "Page fetched successfully"));
});

/**
 * GET /api/pages
 * List published pages (optional)
 */
export const getPublishedPages = asyncHandler(async (_req, res) => {
  const pages = await Page.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .select("title slug type seo createdAt");

  res.json(new ApiResponse(200, pages, "Published pages fetched"));
});