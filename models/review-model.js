const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true, default: 1 },
    review: String,
  },
  { timestamps: true }
);

module.exports = ReviewSchema;
