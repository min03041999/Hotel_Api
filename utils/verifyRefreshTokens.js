const jwt = require("jsonwebtoken");
const User = require("../Models/user.models");

const verifyRefreshTokens = async (token) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyRefreshTokens;
