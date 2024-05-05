import Redis from "redis";

function checkPortAvailability(port) {
  return new Promise((resolve, reject) => {
    const server = require("net").createServer();

    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false);
      } else {
        reject(err);
      }
    });

    server.once("listening", () => {
      server.close();
      resolve(true);
    });

    server.listen(port, "localhost");
  });
}

async function findAvailablePort(startingPort) {
  let port = startingPort;
  while (true) {
    const isAvailable = await checkPortAvailability(port);
    if (isAvailable) {
      return port;
    }

    port++;
  }
}

async function createRedisClient() {
  const availablePort = await findAvailablePort(3000);
  const redisClient = Redis.createClient({
    host: "localhost",
    port: availablePort,
  });
  return redisClient;
}

export default createRedisClient;
