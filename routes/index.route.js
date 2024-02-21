const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "TODO SIMPLE : Главная страница",
    isAuthorized: req.isAuthenticated(),
  });
});

module.exports = router;
