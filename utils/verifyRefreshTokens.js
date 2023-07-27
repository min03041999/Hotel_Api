const jwt = require("jsonwebtoken");
const UserToken = require("../Models/userToken.models");

const verifyRefreshTokens = (refreshToken) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
      const token = UserToken.findOne({ token: refreshToken });

      if (token) {
        jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
          if (err)
            return reject({ error: true, message: "Invalid refresh token" });
          resolve({
            tokenDetails,
            error: false,
            message: "Valid refresh token",
          });
        });
      } else {
        resolve({
          error: true,
          message: "Invalid refresh token",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyRefreshTokens;
