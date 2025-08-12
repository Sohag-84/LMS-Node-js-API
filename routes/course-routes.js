const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const teacherMiddleware = require("../middlewares/teacher-middleware");
const {
  addCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/course-controller");

const router = express.Router();

router.post("/add", authMiddleware, teacherMiddleware, addCourse);
router.get("/get", getAllCourses);
router.post("/update/:id", authMiddleware, teacherMiddleware, updateCourse);
router.post("/delete/:id", authMiddleware, teacherMiddleware, deleteCourse);

module.exports = router;
