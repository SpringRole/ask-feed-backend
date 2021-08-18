const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  phoneNo: {
    type: Number,
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  resetToken: {
    type: String,
    default: null,
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = { User };
