const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const verifyPassword = (user, password) => {
  return user.password === password;
};

const verify = async (username, password, done) => {
  try {
    await Users.findOne({ name: username }, (error, user) => {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false);
      }
      if (!verifyPassword(user, password)) {
        return done(null, false);
      }
      return done(null, user);
    }).select("-__v");
  } catch (error) {
    console.error(`Database err searching user by name ${username}`, error);
    res.status(500).json({
      message: `Database err searching user by name ${username}`,
      erroe: error,
    });
  }
};

const options = {
  usernameField: "username",
  passwordField: "password",
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser(async (id, callback) => {
  try {
    await Users.findById(id, (error, user) => {
      if (error) {
        return error;
      }
      callback(null, user);
    }).select("-__v");
  } catch (error) {
    console.error(
      `Database err searching user by id [${id}] for deserializing`,
      error
    );
    res.status(500).json({
      message: `Database err searching user by id [${id}] for deserialiazing`,
      erroe: error,
    });
  }
});

router.use(passport.session({ secret: "SECRET" }));
router.use(passport.initialize());
router.use(passport.session());

// test route
router.use("/test", (req, res) => {
  res.json("it works!");
});

router.get("/login", (req, res) => {
  res.render("user/pages/login-page", {
    title: "Вход в систему",
  });
});

router.get("/signup", (req, res) => {
  res.render("user/pages/signup-page", {
    title: "Регистрация",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/me",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("login");
    }
    next();
  },
  (req, res) => {
    res.render("user/me", {
      title: "",
      user: req.user,
    });
  }
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "login" }),
  (req, res) => {
    console.log(req.user);
    res.redirect("/");
  }
);

router.post("/signup", (req, res) => {});

module.exports = router;
