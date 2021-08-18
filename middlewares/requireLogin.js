const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userExist = await User.findOne({ email: user.email });

    if (userExist) {
      req.user = userExist;
      next();
    } else {
      res.send("user does not exist");
    }
  } catch (e) {
    res.send("invalid token");
  }
};
module.exports = { protect };
