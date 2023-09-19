import { Router } from "express";
import { authRouter } from "./auth";
import { usersRouter } from "./users";
import { gameRouter } from "./game";

const apiRouter = Router();

apiRouter
  .use("/game", gameRouter)
  .use("/auth", authRouter)
  .use("/users", usersRouter);

export { apiRouter };
