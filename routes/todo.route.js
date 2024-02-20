const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");

router.all("/", async (req, res) => {
  try {
    const todos = await Todo.find().select("-__v");
    res.render("todo/index", {
      title: "All todos",
      todos: todos,
    });
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /`,
      error: error,
    });
  }
});

router.get("/create", (req, res) => {
  res.render("todo/create", {
    title: "Todo create",
    todo: {},
    action: "create/",
  });
});

router.post("/create", (req, res) => {
  const { title, description } = req.body;
  const newTodo = new Todo(title, description);
  req.storage.addNew(newTodo);
  res.redirect("/todo");
});

router.get("/update/:id", (req, res) => {
  const { id } = req.params;
  const idx = req.todos.findIndex((el) => el.id === id);
  if (idx === -1) {
    res.redirect("/404");
  }
  res.render("todo/update", {
    title: "Todo update",
    todo: req.todos[idx],
    action: `/todo/update/${id}`,
  });
});

router.all("/:id", (req, res) => {
  const { id } = req.params;
  const idx = req.todos.findIndex((el) => el.id === id);
  if (idx === -1) {
    res.redirect("/404");
  }
  res.render("todo/view", {
    title: "Todo view",
    todo: req.todos[idx],
  });
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const idx = req.todos.findIndex((el) => el.id === id);
  if (idx === -1) {
    res.redirect("/404");
  }
  req.todos[idx] = {
    ...req.todos[idx],
    title,
    description,
  };
  req.storage.write(req.todos);
  res.redirect(`/todo/${id}`);
});

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  const idx = req.todos.findIndex((el) => el.id === id);
  if (idx === -1) {
    res.redirect("/404");
  }
  req.todos.splice(idx, 1);
  req.storage.write(req.todos);
  res.redirect("/todo");
});

module.exports = router;
