import { Router } from "express";
import { router as authRouter } from "./auth";
import { router as usersRouter } from "./users";
import { router as gameRouter } from "./game";

const apiRouter = Router();

apiRouter
  .use("/game", gameRouter)
  .use("/auth", authRouter)
  .use("/users", usersRouter);

export { apiRouter };
