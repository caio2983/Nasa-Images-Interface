import { RateLimiterFlex } from "rate-limiter-flexible";
import createRedisClient from "./redis";

const maxRequestsPerMinute = 100;
const rateLimiter = new RateLimiterFlex({
  storeClient: createRedisClient,
  keyPrefix: "rl:",
  points: maxRequestsPerMinute,
  duration: 60,
});

export default async;
async function RateLimitMiddleware(req, res, next) {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    res.status(429).json({ error: "Too Many Requests" });
  }
}
