import { Request, Response, NextFunction } from "express";
import { Bucket } from "./bucket";

export type RateLimitFunction = (
  maxBurst: number,
  fillRatePerSecond: number
) => RateLimiter;

export type RateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => NextFunction | void;

export const rateLimit: RateLimitFunction = (maxBurst, fillRatePerSecond) => {
  const tokenBucket = new Bucket(maxBurst, fillRatePerSecond);
  return (req: Request, res: Response, next: NextFunction) => {
    if (tokenBucket.requestToken()) {
      next();
    } else {
      res.status(429).send("Not allowed - Rate Limit Reached");
    }
  };
};

export const rateLimitByIp: RateLimitFunction = (
  maxBurst,
  fillRatePerSecond
) => {
  const userBuckets = new Map();
  return (req: Request, res: Response, next: NextFunction) => {
    if (!userBuckets.has(req.ip)) {
      console.log("Creating for bucket for IP:", req.ip);
      userBuckets.set(req.ip, new Bucket(maxBurst, fillRatePerSecond));
    }
    const currentUserBucket = userBuckets.get(req.ip);
    if (currentUserBucket.requestToken()) {
      next();
    } else {
      res.status(429).send("Not allowed - Rate Limit Reached");
    }
  };
};
