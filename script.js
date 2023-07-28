const express = require("express");
const Redis = require("ioredis");
const app = express();
const cors = require("cors"); // Import cors module

app.use(cors()); // Use cors middleware

const redis = new Redis({
  host: "redis-11050.c60.us-west-1-2.ec2.cloud.redislabs.com",
  port: 11050,
  password: "v7pe69ejX4WqeXISZQvh6BQIb5ftu0gf",
});

redis.on("error", (err) => {
  console.log("Error " + err);
});

app.get("/track-time", async (req, res) => {
  try {
    const reply = await redis.lrange("project_status", 0, -1);
    console.log(reply);
    res.json({ total_windows: reply.length, window_titles: reply });
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to get data!" });
  }
});

app.listen(7000, () => {
  console.log("Listening on port 7000");
});
