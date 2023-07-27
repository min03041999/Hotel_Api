const jwt = require("jsonwebtoken");
const UserToken = require("../Models/userToken.models");

const generateTokens = async (user) => {
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

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await UserToken.deleteOne();

    await new UserToken({ userId: user._id, token: refreshToken }).save();

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateTokens;
