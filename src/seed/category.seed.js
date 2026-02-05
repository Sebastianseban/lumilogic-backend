import mongoose from "mongoose";
import { Category } from "../models/Category.js";

export const seedCategories = async () => {
  await Category.deleteMany();

  const aws = await Category.create({
    title: "AWS & Cloud",
    slug: "aws-cloud",
    order: 1,
  });

  const migration = await Category.create({
    title: "Migration Services",
    slug: "migration-services",
    parentId: aws._id,
    order: 1,
  });

  const data = await Category.create({
    title: "Data & AI",
    slug: "data-ai",
    order: 2,
  });

  return { aws, migration, data };
};