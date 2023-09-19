import { Router } from "express";
import {
  getGameDataByLeague,
  getGameDataById,
  postGameData,
  updateGameDataById,
} from "../controllers/game";

const gameRouter = Router();

gameRouter
  .get("/:league", getGameDataByLeague)
  .get("/all/:id", getGameDataById)
  .post("/", postGameData)
  .put("/:id", updateGameDataById);

export { gameRouter };
