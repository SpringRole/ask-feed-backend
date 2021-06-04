const {User} = require("../models/user");

const bcryptjs = require ('bcryptjs')
const signup = async (req, res) => {
    const {username, password, email, phoneNo } = req.body;
    const userexist = await User.findOne({ email });
    if (!userexist) {
      const newUser = {
        username,
        email,
        password: bcryptjs.hashSync(password, 10),
        phoneNo,
      };
      const user = await User.create(newUser);
      res.send(user);
    } else {
      res.send("User already exist!");
    }
  };
  module.exports = {signup}