const express = require('express')
const router = express.Router()

const { Todo } = require('../src/todo.class')
const {Storage} = require('../src/storage.io')

const storage = new Storage('todos-simple')
const todos = storage.data

router.get('/', (req, res) => {
  res.render("todo/index", {
    title: "TODO SIMPLE",
    todos: todos,
  })
})

router.get('/create', (req, res) => {
  res.render('todo/create', {
    title: "TODO SIMPLE: create todo",
    todo: {},
  })
})

router.post('/create', (req, res) => {
  const { title, description } = req.body
  const newTodo = new Todo(title, description)
  storage.addNew(newTodo)
  res.redirect('/todo')
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const idx = todos.findIndex(el => el.id === id)
  if (idx === -1) {
    res.redirect('/404')
  }
  res.render('todo/udpate', {
    title: 'TODO SIMPLE | view',
    todo: todos[idx],
  })
})

router.post('/update/:id', (req, res) => {
  const { id } = req.params
  const { title, description } = req.body
  const idx = todos.findIndex(el => el.id === id)
  if (idx === -1) {
    res.redirect('/404')
  }

  todos[idx] = {
    ...todos[idx],
    title,
    description,
  }
  storage.write(todos)
  res.redirect(`/todo/${id}`)
})

router.post('/delete/:id', (req, res) => {
  const { id } = req.params
  const idx = todos.findIndex(el => el.id === id)
  if (idx === -1) {
    res.redirect('/404')
  }
  todos.splice(idx, 1)
  storage.write(todos)
  res.redirect('/todo')
})

module.exports = router