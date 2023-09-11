import { Router } from "express";
import {
  getGameDataById,
  postGameData,
  updateGameDataById,
} from "../controllers/game";

const router = Router();

router
  .get("/:id", getGameDataById)
  .post("/", postGameData)
  .put("/:id", updateGameDataById);

export { router };
