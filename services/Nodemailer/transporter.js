const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Pass,
  },
});

module.exports = transporter;
