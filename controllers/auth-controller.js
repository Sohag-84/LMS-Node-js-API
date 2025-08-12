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

//login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user exits or not in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User doesn't exists`,
      });
    }
    //check password correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //create user token
    const accessToken = await jwt.sign(
      {
        userId: user._id,
        name: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfull",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { registerController, loginController };
