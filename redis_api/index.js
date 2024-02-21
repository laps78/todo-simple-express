const express = require("express");
const logger = require("./src/middleware/logger");
const env = require("dotenv");
const redis = require("redis");

env.config();
const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || localhost;
const client = redis.createClient({ url: REDIS_URL });

app.use(logger);

app.get("/counter/:bookId", async (req, res) => {
  const { bookId } = req.params;
  try {
    const count = await client.get(bookId);
    res.json({ counter: count });
  } catch (err) {
    res.json({ errcode: 500, errmsg: `redis error: ${err}` });
  }
});

app.post("/counter/:bookId/incr", async (req, res) => {
  const { bookId } = req.params;
  try {
    const count = await client.incr(bookId);
    res.json({ count: count });
  } catch (err) {
    res.json({ errcode: 500, errmsg: `redis error: ${err}` });
  }
});

app.post("/counter/:bookId/delete", async (req, res) => {
  const { bookId } = req.params;
  try {
    const count = await client.del(bookId);
    res.json({ count: count });
  } catch (err) {
    res.json({ errcode: 500, errmsg: `redis error: ${err}` });
  }
});

app.listen(PORT, () => {
  console.log(`Counter app started at port ${PORT}`);
});
