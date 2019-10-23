'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Game, nbaFields } = require('../models');
const { compareDate, isValid } = require('../helpers');
const { nbaService } = require('../services');

const router = express.Router();
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

router.get('/:id', (req, res) => {
  if(!Game) { 
    res.status(404).json({error: 'Game not found'});
  }
  else{
    Game.findById(req.params.id)
      .then(async (game) => {
          if (compareDate(game.updatedAt)){
            console.log('over 15 second mark')
            const newGame = await nbaService.returnUpdated({
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
        return res.status(500).json({error: 'something went wrong'});
      });
  };
});

router.post('/', jsonParser, (req, res) => {
  const { body } = req;
  if (!isValid(body, nbaFields) || body.league !== 'NBA'){
    return res.status(403).json({error: 'format invalid, expected NBA fields'})
  }

  const game = nbaService.create(req.body);

  Game
    .create(game, (err, game) => {
      if (err) {
        console.error(err);
        return res.status(500).json({message: 'Internal server er;ror'});
      }
      return res.status(201).json(game);
    });
});

router.put('/:id', jsonParser, async (req, res) => {
  try {
    const game = await nbaService.update({ id: req.params.id, data: req.body});
    return res.status(201).json(game);
  } catch (err) {
    return res.status(500).json({message: 'Internal server error'});
  }
});

module.exports = { router };