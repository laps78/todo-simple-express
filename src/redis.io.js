const PORT = process.env.COUNTER_PORT;
const BASE_URL = process.env.COUNTER_URL;

const fetchRedisApi = async (url, method = "GET") => {
  try {
    const request = await fetch(`${BASE_URL}:${PORT}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await request.json();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  fetch: fetchRedisApi,
};
