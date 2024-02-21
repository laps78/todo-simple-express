const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");

router.all(
  "/",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect("/api/user/login");
    }
    next();
  },
  async (req, res) => {
    try {
      const todos = await Todo.find().select("-__v");
      res.render("todo/index", {
        title: "All todos",
        todos: todos,
        isAuthorized: req.isAuthenticated(),
      });
    } catch (error) {
      console.error(`Database err handling route ${req.method}: /}`, error);
      res.status(500).json({
        message: `Database err handling route ${req.method}: /`,
        error: error,
      });
    }
  }
);

router.get("/create", (req, res) => {
  res.render("todo/create", {
    title: "Todo create",
    todo: {},
    action: "create/",
    isAuthorized: req.isAuthenticated(),
  });
});

router.post("/create", async (req, res) => {
  const { title, description } = req.body;
  const newTodo = new Todo({
    title,
    description,
  });
  try {
    await newTodo.save();
    res.redirect("/todo");
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /`,
      erroe: error,
    });
  }
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id).select("-__v");
    if (!todo) {
      res.redirect("/404");
    }
    res.render("todo/update", {
      title: "Todo update",
      todo: todo,
      action: `/todo/update/${id}`,
      isAuthorized: req.isAuthenticated(),
    });
  } catch (error) {
    console.error(
      `Database err handling route ${req.method}: /todo/update/${id}`,
      error
    );
    res.status(500).json({
      message: `Database err handling route ${req.method}: /todo/update/${id}`,
      erroe: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id).select("-__v");
    if (!todo) {
      res.redirect("/404");
    }
    res.render("todo/view", {
      title: "Todo view",
      todo: todo,
      isAuthorized: req.isAuthenticated(),
    });
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    await Todo.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.redirect(`/todo/${id}`);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.deleteOne({ _id: id });
    res.redirect("/todo");
  } catch (error) {
    console.error(
      `Database err handling route ${req.method}: /todo/delete/${id}`,
      error
    );
    res.status(500).json({
      message: `Database err handling route ${req.method}: /todo/delete/${id}`,
      erroe: error,
    });
  }
});

module.exports = router;
