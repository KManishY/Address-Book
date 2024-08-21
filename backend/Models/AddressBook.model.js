const mongoose = require("mongoose");

const addressBookSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  dob: String,
  number:Number,
  website: String,
  group: Number
});

const AddressBook = mongoose.model("adbook", addressBookSchema);

module.exports = { AddressBook };
