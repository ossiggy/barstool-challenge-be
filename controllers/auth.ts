import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWT_EXPIRY, JWT_SECRET } from "../config";

const createAuthToken = (user: any): string => {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: "HS256",
  });
};

export const login = (req: Request, res: Response) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
};

export const refresh = (req: Request, res: Response) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
};
