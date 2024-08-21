const Users = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const verifyPassword = (user, password) => {
  return user.password === password;
};

const options = {
  usernameField: "username",
  passwordField: "password",
};

const verify = async (username, password, done) => {
  try {
    const foundUser = await Users.findOne({
      username: username,
    }).select("-__v");
    if (!foundUser) {
      return done(null, false);
    }
    if (!verifyPassword(foundUser, password)) {
      return done(null, false);
    }
    return done(null, foundUser);
  } catch (error) {
    console.error(`Database err searching user by name ${username}`, error);
    res.status(500).json({
      message: `Database err searching user by name ${username}`,
      error: error,
    });
    done(error);
  }
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser(async (id, callback) => {
  try {
    const foundUser = await Users.findById(id).select("-__v");
    callback(null, foundUser);
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

module.exports = { passport };
