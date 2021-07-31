const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    image: {
      type: String,
    },
    isValidated: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);
module.exports = User;
