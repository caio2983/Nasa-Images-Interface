import Redis from "redis";

const redisClient = Redis.createClient({
  host: "localhost", // replace with your Redis server's hostname
  port: 3000, // replace with your Redis server's port
});

export default redisClient;
