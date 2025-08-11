const express = require("express");

const {
  addCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/category-controller");

const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router.post("/add", authMiddleware, adminMiddleware, addCategory);
router.get("/get", getAllCategories);
router.post("/delete/:id", authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;
