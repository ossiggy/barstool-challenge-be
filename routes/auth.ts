import express from "express";
import { localAuth, jwtAuth } from "../middleware";
import { login, refresh } from "../controllers";

const authRouter = express.Router();

authRouter.post("/login", localAuth, login).post("/refresh", jwtAuth, refresh);

export { authRouter, jwtAuth };
