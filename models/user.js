const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
