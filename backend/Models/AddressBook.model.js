const mongoose = require("mongoose");

const addressBookSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  mobile: Number,
  website: String,
  group: String
});

const AddressBook = mongoose.model("adbook", addressBookSchema);

module.exports = { AddressBook };
