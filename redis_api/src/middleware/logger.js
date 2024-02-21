const fs = require("fs");
const os = require("os");

module.exports = (req, res, next) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const { method, url } = req;
  const userAgent = req.get("user-Agent");
  const data = `${hours}:${minutes}:${seconds}:${method}:${url}:${userAgent}`;

  console.log(data);
  fs.appendFile("server.log", data + os.EOL, (err) => {
    if (err) throw err;
  });
  next();
};
