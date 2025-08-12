const Purchase = require("../models/purchase-model");
const Course = require("../models/course-model");

const purchaseCourse = async (req, res) => {
  if (req.userInfo.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Only student can buy this course.",
    });
  }
  const courseId = req.params.id;
  const studentId = req.userInfo.userId;
  try {
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // Create purchase (unique index will prevent duplicates)
    const purchase = await Purchase.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Course purchased successfully.",
      data: purchase,
    });
  } catch (error) {
    if (error.code === 11000) {
      // duplicate course sell error
      return res
        .status(400)
        .json({ success: false, message: "You already purchased this course" });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = purchaseCourse;
