const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const { getAllUsers, getmyCourses } = require("../controllers/user-controller");

const router = express.Router();

router.get("/get", getAllUsers);
router.get("/courses", authMiddleware, getmyCourses);

module.exports = router;
