const User = require("../models/registeruser");
const { sendOTPByEmail } = require("../services/Nodemailer/nodemailer");
const generateToken = require("../services/token/genreatetoken");
const generateOTP = require("../services/Otp/genrateotp");

exports.protectedRoute = async (req, res) => {
  res.status(200).json({ message: "Access Granted" });
};

// Register User

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const OtpCode = generateOTP();

    const createuser = await User.create({
      username,
      email,
      password,
      isAdmin: false,
      otp: OtpCode,
    });

    await sendOTPByEmail(createuser.email, createuser.otp);

    res
      .status(201)
      .json({ email: createuser.email, message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Login User

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id, user.isAdmin);

    const userobj = {
      username: user.username,
      email: user.email,
    };

    // Password is valid, user can be logged in
    res.status(200).json({ message: "Login successful", user: userobj, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Verify Otp

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    // Update the user's status to verified or perform any necessary actions
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
};
