const User = require("../Models/user.models");
const UserToken = require("../Models/userToken.models");
const generateTokens = require("../utils/generateTokens");
const verifyRefreshTokens = require("../utils/verifyRefreshTokens");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bcryptjs = bcrypt.genSaltSync(10); // bcrypt data => using for password

// Get User
exports.getUser = async (req, res, next) => {
  try {
    const data = await User.find();
    if (data) {
      res
        .status(201)
        .json({ message: "Fetched user successfully", user: data });
    } else {
      res.status(401).json({ message: "Data is error" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error Server",
    });
  }
};

// Register
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  try {
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      const userCreate = await User.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, bcryptjs),
      });
      res.status(201).json({
        message: "Your account is created successfully",
        user: userCreate,
      });
    } else {
      res
        .status(401)
        .json({ message: "Email is not existed", user: { email: email } });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error Server",
    });
  }
};

// Update
exports.updateUser = async (req, res, next) => {
  const userId = req.params.UserId;
  const { name, password } = req.body;

  if (userId) {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      password: bcrypt.hashSync(password, bcryptjs),
    });

    res.status(201).json({
      message: "User is updated successfully",
      user: updatedUser,
    });
  } else {
    res.status(401).json({
      message: "User is not found",
    });
  }
};

// Delete
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.UserId;

  const findUser = await User.findById({ _id: userId });

  // console.log(findUser.name);
  if (findUser) {
    await User.findByIdAndRemove(userId);

    res.status(200).json({
      message: "User is deleted successfully",
      user: findUser.name,
    });
  } else {
    res.status(401).json({
      message: "User is not found",
    });
  }
};

// Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const isEqual = bcrypt.compareSync(password, user.password);

    if (isEqual) {
      const { accessToken, refreshToken } = await generateTokens(user);

      res.status(201).json({
        message: "Login is successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(401).json({
        message: "Your email or password is correct",
      });
    }
  } else {
    res.status(401).json({
      message: "Your email is not exist",
    });
  }
};

// RefreshToken
exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.body.token;

  verifyRefreshTokens(refreshToken)
    .then(({ tokenDetails }) => {
      const payload = {
        id: tokenDetails.id,
        name: tokenDetails.name,
        email: tokenDetails.email,
      };

      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "14m" }
      );

      res.status(201).json({
        message: "Access token created successfully",
        accessToken,
      });
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

//logout
exports.logout = async (req, res, next) => {
  const token = req.res.token;

  try {
    const findToken = await UserToken.findOne({ token: token });

    if (!findToken)
      return res.status(200).json({
        message: "Logged Out successfully",
      });

    await UserToken.deleteOne({ token: token });

    res.status(200).json({
      message: "Logged Out successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Server",
    });
  }
};
