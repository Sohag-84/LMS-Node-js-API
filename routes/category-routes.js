const express = require("express");

const {
  addCategory,
  getAllCategories,
} = require("../controllers/category-controller");

const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router.post("/add", authMiddleware, adminMiddleware, addCategory);
router.get("/get", getAllCategories);

module.exports = router;
