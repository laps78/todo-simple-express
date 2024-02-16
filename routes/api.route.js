const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const Todo = require("../models/todo");

router.use("/user", userRoute);

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().select("-__v");
    res.status(200).json(todos);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id).select("-__v");
    res.json(todo);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const newTodo = new Todo({
    title,
    description,
  });
  try {
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /`,
      erroe: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    await Todo.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.redirect(`/api/${id}`);
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.deleteOne({ _id: id });
    res.status(200).json("Todo delete success");
  } catch (error) {
    console.error(`Database err handling route ${req.method}: /${id}`, error);
    res.status(500).json({
      message: `Database err handling route ${req.method}: /${id}`,
      erroe: error,
    });
  }
});

module.exports = router;
