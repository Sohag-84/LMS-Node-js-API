const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const teacherMiddleware = require("../middlewares/teacher-middleware");
const {
  addCourse,
  getAllCourses,
} = require("../controllers/course-controller");

const router = express.Router();

router.post("/add", authMiddleware, teacherMiddleware, addCourse);
router.get("/get", getAllCourses);

module.exports = router;
