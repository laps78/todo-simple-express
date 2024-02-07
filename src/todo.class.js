const { v4: uuid } = require("uuid");

class Todo {
  constructor(title = "", description = "", id = uuid()) {
    this.title = title;
    this.description = description;
    this.id = id;
  }
}

module.exports = { Todo };
