const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: String,
    job_title: String,
  },
  { timestamps: true }
);
const User = mongoose.model("Usertest", userSchema);

module.exports = User;