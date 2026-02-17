import { Page } from "../models/Page.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

/**
 * POST /api/admin/pages
 */
export const createPage = asyncHandler(async (req, res) => {
  const { title, slug, type, categoryId, blocks, seo, isPublished } = req.body;

  if (!title || !slug || !type) {
    throw new ApiError(400, "Title, slug and type are required");
  }

  const existingPage = await Page.findOne({ slug });
  if (existingPage) {
    throw new ApiError(400, "Page with this slug already exists");
  }

  const page = await Page.create({
    title,
    slug,
    type,
    categoryId,
    blocks,
    seo,
    isPublished,
  });

  res.status(201).json(
    new ApiResponse(201, page, "Page created successfully")
  );
});

/**
 * PUT /api/admin/pages/:id
 */
export const updatePage = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    throw new ApiError(404, "Page not found");
  }

  const { slug, ...updates } = req.body; // prevent slug overwrite
  Object.assign(page, updates);

  await page.save();

  res.json(new ApiResponse(200, page, "Page updated successfully"));
});

/**
 * GET /api/admin/pages
 */
export const getAllPages = asyncHandler(async (_req, res) => {
  const pages = await Page.find()
    .sort({ createdAt: -1 })
    .select("-blocks");

  res.json(new ApiResponse(200, pages, "Pages fetched successfully"));
});

/**
 * DELETE /api/admin/pages/:id
 */
export const deletePage = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    throw new ApiError(404, "Page not found");
  }

  await page.deleteOne();

  res.json(new ApiResponse(200, null, "Page deleted successfully"));
}); 


export const getPageById = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    throw new ApiError(404, "Page not found");
  }

  res.json(new ApiResponse(200, page, "Page fetched successfully"));
});