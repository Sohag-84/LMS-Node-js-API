const Category = require("../models/category-model");

const addCategory = async (req, res) => {
  const { title, slug, image } = req.body;

  if (title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }
  if (slug.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Slug is required",
    });
  }
  if (image.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Slug is required",
    });
  }
  try {
    const newCategory = new Category({
      title,
      slug,
      image,
    });
    await newCategory.save();
    if (newCategory) {
      return res.status(201).json({
        success: true,
        message: "Category has been created",
        data: newCategory,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res.json({
      success: true,
      message: "Category fetched successfully",
      data: allCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (category) {
      return res.status(200).json({
        success: true,
        message: "Category has been deleted",
        data: category,
      });
    }
    res.status(400).json({
      success: false,
      message: "Category not found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = { addCategory, getAllCategories, deleteCategory };
