const User = require("../Models/user.models");
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
        .json({ message: "Email is existed", user: { email: email } });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error Server",
    });
  }
};

// Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const pass_user = bcryptjs.compareSync(password, user.password);

    if (pass_user) {
      const token = jwt.sign({});
    }
  }
};
