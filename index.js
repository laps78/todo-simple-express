const express = require("express");
const errorMW = require("./middleware/error");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");

const todoApiRouter = require("./routes/api.route");
const indexRouter = require("./routes/index.route");
const todoRouter = require("./routes/todo.route");

dotenv.config();
const PORT = process.env.PORT || 3000;
const UrlDB = process.env.UrlDB;
const DB_NAME = process.env.DB_NAME;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "SECRET",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000,
      httpOnly: false,
    },
  })
);

app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/api", todoApiRouter);
app.use("/todo", todoRouter);
app.use(errorMW);

const startApp = async (PORT, UrlDB, DB_NAME) => {
  try {
    await mongoose.connect(UrlDB, {
      dbName: DB_NAME,
    });
    app.listen(PORT) &&
      console.log(`Приложение успешно запущено localhost:${PORT}`);
  } catch (err) {
    console.error(
      `Ошибка при запуске приложения(port=${PORT}, db_adress=${UrlDB}): `,
      err
    );
  }
};

startApp(PORT, UrlDB, DB_NAME);
