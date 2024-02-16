const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.use("/test", (req, res) => {
  res.json("it works!");
});

router.get("/login", (req, res) => {});

router.get("/me", (req, res) => {});

router.post("/login", (req, res) => {});

router.post("/signup", (req, res) => {});

module.exports = router;
