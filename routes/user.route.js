const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.use((req, res) => {
  res.json("it works!");
});

module.exports = router;
