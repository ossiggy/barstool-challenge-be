import { Request, Response, Router } from "express";
const mongoose = require("mongoose");
const { mlbService } = require("../services");
const { compareDate, isValid } = require("../helpers");
const { Game, mlbFields } = require("../models");

const router = Router();

mongoose.Promise = global.Promise;

router.get("/:id", (req, res) => {
  Game.findById(req.params.id)
    .then(async (game) => {
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      if (compareDate(game.updatedAt)) {
        console.log("over 15 second mark", game.feedUrl);
        const newGame = await mlbService.returnUpdated({
          id: req.params.id,
          feed: game.feedUrl,
        });
        return res.json(newGame);
      }
      console.log("under 15 second mark");
      return res.json(game);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ error: "something went wrong", message: err.message });
    });
});

router.post("/", (req, res) => {
  const { body } = req;
  if (!isValid(body, mlbFields) || body.league !== "MLB") {
    console.log("not valid", req.body);
    return res.status(403).json({
      message: "format invalid, expected MLB fields",
    });
  }

  const game = mlbService.create(req.body);
  Game.create(game, (err, game) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
    return res.status(201).json(game);
  });
});

router.put("/:id", async (req, res) => {
  const { body, params } = req;
  if (!isValid(body, mlbFields) || body.league !== "MLB") {
    return res.status(403).json({
      message: "format invalid, expected MLB fields",
    });
  }

  try {
    const game = await mlbService.update({ id: params.id, data: body });
    return res.status(201).json(game);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

module.exports = { router };
