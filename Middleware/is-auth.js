const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const access =
      req.headers["x-access-token"] ||
      req.headers["authorization"] ||
      req.query.token ||
      req.body.token;

    // console.log(access);

    const token = access && access.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const user = jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY);

    req.userId = user.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized!" });
  }
};
