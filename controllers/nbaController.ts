"use strict";
const express = require("express");
const mongoose = require("mongoose");
const { Game, nbaFields } = require("../models");
const { compareDate, isValid } = require("../helpers");
const { nbaService } = require("../services");

const router = express.Router();

mongoose.Promise = global.Promise;

router.get("/:id", (req, res) => {
  Game.findById(req.params.id)
    .then(async (game) => {
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      if (compareDate(game.updatedAt)) {
        console.log("over 15 second mark");
        const newGame = await nbaService.returnUpdated({
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
  if (!isValid(body, nbaFields) || body.league !== "NBA") {
    return res.status(403).json({
      error: "format invalid, expected NBA fields",
    });
  }

  const game = nbaService.create(req.body);

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
  if (!isValid(body, nbaFields) || body.league !== "NBA") {
    return res.status(403).json({
      error: "format invalid, expected NBA fields",
    });
  }

  try {
    const game = await nbaService.update({ id: params.id, data: body });
    return res.status(201).json(game);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = { router };
