import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  createGameInfo,
  updateGameInfo,
  returnUpdatedGameInfo,
} from "../services";
import { compareDate, isValid, mlbFields, nbaFields } from "../helpers";
import { GameStats } from "../models";

export const getGameDataById = (req: Request, res: Response) => {
  GameStats.findById(req.params.id)
    .then(async (game) => {
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      if (compareDate(game.updatedAt)) {
        const newGame = await returnUpdatedGameInfo({
          id: req.params.id,
          feed: game.feedUrl,
        });
        return res.json(newGame);
      }
      return res.json(game);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ error: "something went wrong", message: err.message });
    });
};

export const postGameData = async (req: Request, res: Response) => {
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
  res.json(game);
};

export const updateGameDataById = async (req: Request, res: Response) => {
  const { body, params } = req;
  if (!isValid(body, mlbFields) || body.league !== "MLB") {
    return res.status(403).json({
      message: "format invalid, expected MLB fields",
    });
  }

  try {
    const game = await updateGameInfo({ id: params.id, data: body });
    return res.status(201).json(game);
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
};
