const jwt = require("jsonwebtoken");
// const User = require("../Models/user.models");

const generateTokens = (user) => {
  try {
    const payload = { id: user._id, name: user.name, email: user.email };

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "14m" }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateTokens;
