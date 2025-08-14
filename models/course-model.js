const mongoose = require("mongoose");

const Review = require("../models/review-model");

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  order: Number,
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      text: true,
    },
    description: String,
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    videos: [VideoSchema],
    price: {
      type: Number,
      default: 0,
    },
    reviews: [Review],
  },
  { timestamps: true }
);

CourseSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Course", CourseSchema);
