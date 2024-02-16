const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
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

module.exports = model("Todo", userSchema);
