const User = require("../models/user-model");
const Purchase = require("../models/purchase-model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const getmyCourses = async (req, res) => {
  if (req.userInfo.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Only student can buy this course.",
    });
  }
  try {
    const purchase = await Purchase.find({
      student: req.userInfo.userId,
    }).populate("course");

    res.json({
      success: true,
      message: "Fetched coureses",
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = { getAllUsers, getmyCourses };
