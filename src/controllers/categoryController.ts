import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, status } = req.body;
    const category = new Category({ name, status });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Failed to create category" });
  }
};

export const getCategories = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.find().lean();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to Get categories" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, status } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    if (name) category.name = name;
    if (status) category.status = status;

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    await Category.findByIdAndDelete(category._id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
