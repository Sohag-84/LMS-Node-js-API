const Course = require("../models/course-model");
const Category = require("../models/category-model");
const User = require("../models/user-model");

const addCourse = async (req, res) => {
  const { teacherName, title, description, slug, price } = req.body;
  if (teacherName === "") {
    return res
      .status(400)
      .json({ success: false, message: "Teacher is required" });
  }
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
    const teacher = await User.findOne({ name: teacherName });
    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }
    const category = await Category.findOne({ slug });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    const course = new Course({
      teacher: teacher._id,
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
    const course = await Course.find().populate("category").populate("teacher");
    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
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

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, slug, price, teacherName } = req.body;
    //find the course
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // If Teacher but not the owner
    if (
      req.userInfo.role === "teacher" &&
      course.teacher.toString() !== req.userInfo.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update another teacher's course",
      });
    }

    // Teacher and admin updating own course
    if (title) course.title = title;
    if (description) course.description = description;
    if (slug) {
      const category = await Category.findOne({ slug });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      course.category = category._id;
    }
    if (price) course.price = price;
    if (teacherName) {
      const teacher = await User.findOne({ name: teacherName });

      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: "Teacher not found",
        });
      }
      course.teacher = teacher._id;
    }

    // Save the updated course
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
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

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    //find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    // If Admin → allow delete
    if (req.userInfo.role === "admin") {
      await course.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully (Admin)",
      });
    }

    // If Teacher but not the owner
    if (
      req.userInfo.role === "teacher" &&
      course.teacher.toString() !== req.userInfo.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete another teacher's course",
      });
    }

    // Teacher deleting own course
    await course.deleteOne();
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
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

module.exports = { addCourse, getAllCourses, updateCourse, deleteCourse };
