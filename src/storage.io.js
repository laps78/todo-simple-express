const fs = require("fs");
const path = require("path");

class Storage {
  constructor(name) {
    this.name = name;
    this.fileName = `${name}.json`;
    this.path = path.join(
      process.mainModule.path,
      "data-storage",
      this.fileName
    );
    this.data = [];
    this.read();
  }

  setData(data) {
    this.data = data;
  }

  read() {
    fs.readFile(this.path, (err, data) => {
      if (err) {
        console.error(err);
      }
      this.setData(JSON.parse(data));
    });
  }

  write(data) {
    fs.writeFile(this.path, JSON.stringify(data), "utf-8", (err) => {
      if (err) {
        console.error(err);
      }
    });
    this.read();
  }

  addNew(data) {
    this.data.push(data);
    this.write(this.data);
  }
}

module.exports = { Storage };
