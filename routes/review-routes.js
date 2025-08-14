const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const {
  addCourseReview,
  getCourseReviews,
} = require("../controllers/review-controller");

const router = express.Router();

router.post("/review/:id", authMiddleware, addCourseReview);
router.get("/reviews/:id", getCourseReviews);

module.exports = router;
