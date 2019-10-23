'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Game, mlbFields } = require('../models');
const { compareDate, isValid } = require('../helpers');
const { mlbService } = require('../services');

const router = express.Router();
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

router.get('/:id', (req, res) => {
  if(!Game) { 
    res.status(404).json({error: 'Game not found'});
  }
  else {
    Game.findById(req.params.id)
      .then(async (game) => {
          if (compareDate(game.updatedAt)){
            console.log('over 15 second mark', game.feedUrl);
            const newGame = await mlbService.returnUpdated({
              id: req.params.id,
              feed: game.feedUrl
            });
            return res.json(newGame);
          }
          console.log('under 15 second mark');
          return res.json(game);
        })
      .catch(err => {
        console.error(err);
        return res.status(500).json({error: 'something went wrong', message: err.message});
      });
  };
});

router.post('/', jsonParser, (req, res) => {
  const { body } = req;
  if (!isValid(body, mlbFields) || body.league !== 'MLB'){
    return res.status(403).json({ message: 'format invalid, expected MLB fields', error: err.message })
  }

  const game = mlbService.create(req.body);

  Game
    .create(game, (err, game) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }
      return res.status(201).json(game);
    });
});

router.put('/:id', jsonParser, async (req, res) => {
  try {
    const game = await mlbService.update({ id: req.params.id, data: req.body});
    return res.status(201).json(game);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { router };
