import { Category } from "../models/Category.js";
import { Page } from "../models/Page.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

/**
 * GET /api/menu
 * Public mega menu
 */
export const getMenu = asyncHandler(async (_req, res) => {
  // Fetch active categories
  const categories = await Category.find({ isActive: true })
    .sort({ order: 1 })
    .lean();

  // Fetch published pages
  const pages = await Page.find({ isPublished: true })
    .select("title slug categoryId")
    .lean();

  // Map categories
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat._id] = { ...cat, children: [], pages: [] };
  });

  // Build parent-child category tree
  categories.forEach((cat) => {
    if (cat.parentId) {
      categoryMap[cat.parentId]?.children.push(categoryMap[cat._id]);
    }
  });

  // Attach pages to categories
  pages.forEach((page) => {
    if (page.categoryId && categoryMap[page.categoryId]) {
      categoryMap[page.categoryId].pages.push({
        title: page.title,
        slug: page.slug,
      });
    }
  });

  // Only return root categories
  const menu = Object.values(categoryMap).filter(
    (cat) => !cat.parentId
  );

  res.json(new ApiResponse(200, menu, "Menu fetched successfully"));
});