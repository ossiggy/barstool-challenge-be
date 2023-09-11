import { Router } from "express";
import { jwtAuth, isAuthorizedForAction } from "../middleware";
import { createUser, getUserById, updateUser } from "../controllers";

const router = Router();

router
  .post("/", createUser)
  .get("/:userId", jwtAuth, isAuthorizedForAction, getUserById)
  .put("/:userId", jwtAuth, isAuthorizedForAction, updateUser);

export { router };
