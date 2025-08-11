const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      trim: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
