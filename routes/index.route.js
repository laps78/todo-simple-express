const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'TODO EXPRE$$ : Главная страница',
  })
})

module.exports = router