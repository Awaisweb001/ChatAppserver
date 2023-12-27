const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth");
const verifyToken = require("../services/token/Verifytoken");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/protected", verifyToken, userController.protectedRoute);
router.post("/verify-otp", userController.verifyOTP);

module.exports = router;
