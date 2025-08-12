const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const purchaseCourse = require("../controllers/purchase-controller");

const router = express.Router();

router.post("/:id/purchase", authMiddleware, purchaseCourse);

module.exports = router;
