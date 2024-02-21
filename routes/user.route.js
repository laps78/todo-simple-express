const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const { passport } = require("../middleware/userAuth");

router.get("/login", (req, res) => {
  res.render("user/pages/login-page", {
    title: "Вход в систему",
    isAuthorized: req.isAuthenticated(),
  });
});

router.get("/signup", (req, res) => {
  res.render("user/pages/signup-page", {
    title: "Регистрация",
    isAuthorized: req.isAuthenticated(),
  });
});

router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    console.error(error);
  });
  res.redirect("/");
});

router.get(
  "/profile",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("login");
    }
    next();
  },
  (req, res) => {
    console.log(`в шаблон идет ${req.user.nickname}`);
    res.render("user/pages/profile", {
      title: `${req.user.nickname} | аккаунт`,
      isAuthorized: req.isAuthenticated(),
      user: req.user,
    });
  }
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "login" }),
  (req, res) => {
    res.redirect("/todo");
  }
);

router.post("/signup", async (req, res) => {
  const { nickname, username, password } = req.body;
  const newUser = new Users({
    nickname,
    username,
    password,
  });
  try {
    await newUser.save();
    res.status(200).redirect("login");
  } catch (error) {
    console.error(
      `Database err creating user с ником ${nickname} логином ${username} и паролем ${password}`,
      error
    );
    res.status(500).json({
      message: `Database err creating user с ником ${nickname} логином ${username} и паролем ${password}`,
      erroe: error,
    });
  }
});

module.exports = router;
