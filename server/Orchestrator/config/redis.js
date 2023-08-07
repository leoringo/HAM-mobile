const Redis = require("ioredis");

const redisClient = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_URL, // Redis host
    username: "default", // needs Redis >= 6
    password: process.env.REDIS_PASSWORD,
    db: 0, // Defaults to 0
  });;


module.exports = redisClient;
