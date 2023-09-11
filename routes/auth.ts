import express from "express";
import { localAuth, jwtAuth } from "../middleware";
import { login, refresh } from "../controllers";

const router = express.Router();

router.post("/login", localAuth, login).post("/refresh", jwtAuth, refresh);

export { router, jwtAuth };
