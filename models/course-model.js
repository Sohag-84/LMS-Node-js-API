const { text } = require("express");
const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  order: Number,
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      text: true,
    },
    description: String,
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    videos: [VideoSchema],
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

CourseSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Course", CourseSchema);
