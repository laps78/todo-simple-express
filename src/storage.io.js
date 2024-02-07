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
    fs.access(this.path, fs.constants.R_OK, (err) => {
      if (err) {
        console.log("Хранилище не найдено. Будет создано новое хранилище...");
        this.write(this.data);
      } else {
        console.log("Хранилище обнаружено. Чтение данных...");
        this.read();
      }
    });
  }

  setData(data) {
    this.data = data;
  }

  read() {
    fs.readFile(this.path, (err, data) => {
      if (err) {
        console.error(err);
      }
      const parsedData = JSON.parse(data);
      this.setData(parsedData);
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
