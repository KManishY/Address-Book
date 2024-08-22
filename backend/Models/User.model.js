const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  username: String,
  mobile: Number,
  OTP: {type: Number, default: ''}
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
