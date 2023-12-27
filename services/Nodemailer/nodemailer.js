const nodemailer = require("nodemailer");
const transporter = require("./transporter");
// const hbs = require("hbs");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const sendOTPByEmail = async (email, otp) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("../server/services/handlebars"),
      defaultLayout: false,
    },
    viewPath: path.resolve("../server/services/handlebars"),
    extName: ".handlebars",
  };
  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: process.env.Email,
    to: email,
    template: "otpTemplete",
    subject: "Your OTP for registration",
    context: {
      otp: otp,
    },
  };
  const res = await sendEmail(mailOptions);
};

module.exports = { sendOTPByEmail };
