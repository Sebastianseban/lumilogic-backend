import { Category } from "../models/Category.js";

/**
 * CREATE CATEGORY
 */
export const createCategory = async (req, res) => {
  const { title, slug, parentId, order, isActive } = req.body;

  // basic validation
  if (!title || !slug) {
    return res.status(400).json({
      success: false,
      message: "Title and slug are required",
    });
  }

  const exists = await Category.findOne({ slug });
  if (exists) {
    return res.status(409).json({
      success: false,
      message: "Slug already exists",
    });
  }

  const category = await Category.create({
    title,
    slug,
    parentId: parentId || null,
    order: order ?? 0,
    isActive: isActive ?? true,
  });

  res.status(201).json({
    success: true,
    data: category,
    message: "Category created",
  });
};


export const updateCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const updated = await Category.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    data: updated,
    message: "Category updated",
  });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const hasChildren = await Category.exists({ parentId: id });
  if (hasChildren) {
    return res.status(400).json({
      success: false,
      message: "Cannot delete category with children",
    });
  }

  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.json({
    success: true,
    message: "Category deleted",
  });
};

export const getCategoryTree = async (_req, res) => {
  const categories = await Category.find({ isActive: true })
    .sort({ order: 1 })
    .lean();

  const map = {};
  const tree = [];

  categories.forEach((cat) => {
    map[cat._id] = { ...cat, children: [] };
  });

  categories.forEach((cat) => {
    if (cat.parentId) {
      map[cat.parentId]?.children.push(map[cat._id]);
    } else {
      tree.push(map[cat._id]);
    }
  });

  res.json({
    success: true,
    data: tree,
  });
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.json({
    success: true,
    data: category,
  });
};