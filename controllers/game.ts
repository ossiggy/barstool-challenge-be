import { Request, Response } from "express";
import {
  createGameInfo,
  updateGameInfo,
  returnUpdatedGameInfo,
} from "../services";
import { compareDate, isValid, mlbFields, nbaFields } from "../helpers";
import { GameStats } from "../models";

const validLeagues = ["mlb", "nba"];

export const getGameDataByLeague = async (req: Request, res: Response) => {
  try {
    const { league } = req.params;
    if (!validLeagues.includes(league)) {
      return res.status(500).json({ error: "Invalid league" });
    }
    const game = await GameStats.findOne({
      league: req.params.league.toUpperCase(),
    });
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    if (compareDate(game.updatedAt)) {
      const newGame = await returnUpdatedGameInfo(game.id, game.feedUrl);
      return res.json(newGame);
    }
    return res.json(game);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getGameDataById = async (req: Request, res: Response) => {
  try {
    const game = await GameStats.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    if (compareDate(game.updatedAt)) {
      const newGame = await returnUpdatedGameInfo(req.params.id, game.feedUrl);
      return res.json(newGame);
    }
    return res.json(game);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const postGameData = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    let validData = false;
    if (body.league === "MLB") {
      validData = isValid(body, mlbFields);
    } else if (body.league === "NBA") {
      validData = isValid(body, nbaFields);
    }
    if (!validData) {
      return res.status(403).json({
        message: "format invalid",
      });
    }

    const game = await createGameInfo(req.body);
    return res.json(game);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const updateGameDataById = async (req: Request, res: Response) => {
  const { body, params } = req;
  try {
    let validData = false;
    if (body.league === "MLB") {
      validData = isValid(body, mlbFields);
    } else if (body.league === "NBA") {
      validData = isValid(body, nbaFields);
    }
    if (!validData) {
      return res.status(403).json({
        message: "format invalid",
      });
    }
    const game = await updateGameInfo(params.id, body);
    return res.status(201).json(game);
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
};
