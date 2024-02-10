const express = require("express");
const router = express.Router();

const { Todo } = require("../src/todo.class");
const { Storage } = require("../src/storage.io");

// TODO ВОТ ТУТ НУЖНО КРАСИВО ДОБАВИТЬ НЕМНОГО КАШЕРНОЙ АСИНХРОННОСТИ
// или перейти на синхронный метод чтения
router.use((req, res, next) => {
  req.storage = new Storage("todos-simple");
  setTimeout(() => {
    req.todos = req.storage.data;
    next();
  }, 1000);
});

router.all("/", (req, res) => {
  res.render("todo/index", {
    title: "TODO SIMPLE",
    todos: req.todos,
  });
});

router.get("/create", (req, res) => {
  res.render("todo/create", {
    title: "TODO SIMPLE: create todo",
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
    title: "TODO SIMPLE: update todo",
    todo: req.todos[idx],
    action: `update/${id}`,
  });
});

router.all("/:id", (req, res) => {
  const { id } = req.params;
  const idx = req.todos.findIndex((el) => el.id === id);
  if (idx === -1) {
    res.redirect("/404");
  }
  res.render("todo/view", {
    title: "TODO SIMPLE | view",
    todo: req.todos[idx],
  });
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const idx = req.todos.findIndex((el) => el.id === id);
  if (idx === -1) {
    //
    console.log("не нашел post (", idx, ")", id);
    //
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
