const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId, isAdmin = false) => {
  const token = jwt.sign({ userId, isAdmin }, process.env.SECRET_KEY, {
    expiresIn: "30m",
  });
  return token;
};

module.exports = generateToken;
