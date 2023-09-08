import { Request, Response } from "express";
import mongoose, { MongooseError } from "mongoose";
import { mlbService } from "../services";
import { compareDate, isValid } from "../helpers";
import { Game, mlbFields } from "../models";

mongoose.Promise = global.Promise;

export const getGameDataById = (req: Request, res: Response) => {
  Game.findById(req.params.id)
    .then(async (game) => {
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      if (compareDate(game.updatedAt)) {
        const newGame = await mlbService.returnUpdated({
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

export const postGameData = (req: Request, res: Response) => {
  const { body } = req;
  if (!isValid(body, mlbFields) || body.league !== "MLB") {
    console.log("not valid", req.body);
    return res.status(403).json({
      message: "format invalid, expected MLB fields",
    });
  }

  const game = mlbService.create(req.body);
  Game.create(game, (err: MongooseError, game) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
    return res.status(201).json(game);
  });
};

export const updateGameDataById = async (req: Request, res: Response) => {
  const { body, params } = req;
  if (!isValid(body, mlbFields) || body.league !== "MLB") {
    return res.status(403).json({
      message: "format invalid, expected MLB fields",
    });
  }

  try {
    const game = await mlbService.update({ id: params.id, data: body });
    return res.status(201).json(game);
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
};
