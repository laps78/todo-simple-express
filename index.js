const express = require('express')
const errorMW = require('./middleware/error')

const indexRouter = require('./routes/index.route')
const todoRouter = require('./routes/todo.route')

const app = express()
app.use(express.urlencoded())
app.set("view engine", "ejs")

app.use('/', indexRouter)
app.use('/todo', todoRouter)

app.use(errorMW)

const port = process.env.PORT || 3000
app.listen(port)
