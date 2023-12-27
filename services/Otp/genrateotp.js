const generateOTP = () => {
  const otp = Math.floor(Math.random() * 9999);
  return otp.toString();
};

module.exports = generateOTP;
