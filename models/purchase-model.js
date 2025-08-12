const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate purchase by unique index on (student, course)
PurchaseSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Purchase", PurchaseSchema);
