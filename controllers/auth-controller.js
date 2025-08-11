const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

//register controller
const registerController = async (req, res) => {
  try {
    //extract user information from our request body
    const { name, email, phoneNumber, password, role } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exists" });
    }

    //hash user passwrod
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create a new user and save in your database
    const newlyCreatedUser = new User({
      name,
      email,
      phoneNumber,
      password: hashPassword,
      role: role || "user",
    });
    await newlyCreatedUser.save();
    if (newlyCreatedUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: newlyCreatedUser,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Unable to register user! Please try again",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!" + error,
    });
  }
};

module.exports = { registerController };
