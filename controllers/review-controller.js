const Purchase = require("../models/purchase-model");
const Course = require("../models/course-model");

const addCourseReview = async (req, res) => {
  if (req.userInfo.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Only student cant take review",
    });
  }
  const courseId = req.params.id;
  const { rating, review } = req.body;
  try {
    //first of all check student bought this course or not
    const bought = await Purchase.findOne({
      student: req.userInfo.userId,
      course: courseId,
    });
    if (!bought) {
      return res.status(403).json({
        success: false,
        mesage: "You must purchase this course to give a review",
      });
    }

    //find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the user already reviewed this course
    const reviewExist = course.reviews.some(
      (review) => review.student.toString() === req.userInfo.userId
    );
    if (reviewExist) {
      return res.status(403).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    //add review
    course.reviews.push({
      student: req.userInfo.userId,
      rating,
      review,
    });

    //save the review
    await course.save();

    return res.status(201).json({
      success: true,
      mesage: "Review added successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const getCourseReviews = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId)
      .populate("reviews.student", "name email")
      .select("reviews");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course reviews retrieved successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = { addCourseReview, getCourseReviews };
