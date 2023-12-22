const { v4: uuid } = require('uuid')

class Todo {
  constructor(title = "", desc = "", id = uuid()) {
    this.title = title;
    this.desc = desc;
    this.id = id;
  }
}

module.exports = {Todo}