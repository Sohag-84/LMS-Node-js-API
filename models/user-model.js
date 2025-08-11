const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
});

module.exports = mongoose.model("User", UserSchema);
