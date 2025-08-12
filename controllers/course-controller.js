const Course = require("../models/course-model");
const Category = require("../models/category-model");

const addCourse = async (req, res) => {
  const { title, description, slug, price } = req.body;
  if (title === "") {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  if (description === "") {
    return res
      .status(400)
      .json({ success: false, message: "Description is required" });
  }
  if (slug === "") {
    return res
      .status(400)
      .json({ success: false, message: "Category is required" });
  }
  if (price === "") {
    return res
      .status(400)
      .json({ success: false, message: "Price is required" });
  }
  try {
    const category = await Category.findOne({ slug });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    const course = new Course({
      title,
      description,
      category: category._id,
      price,
    });
    await course.save();
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const course = await Course.find().populate("category");
    res.status(200).json({
      success: true,
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = { addCourse, getAllCourses };
