const express = require('express')
const errorMW = require('./middleware/error')
const dotenv = require('dotenv')

const indexRouter = require('./routes/index.route')
const todoRouter = require('./routes/todo.route')

dotenv.config()
const app = express()
//app.use(express.urlencoded())
app.set("view engine", "ejs")

app.use('/', indexRouter)
app.use('/todo', todoRouter)

app.use(errorMW)

const PORT = process.env.PORT || 3000
app.listen(PORT) && console.log(`app sucsessfully started at localhost:${PORT}`)
