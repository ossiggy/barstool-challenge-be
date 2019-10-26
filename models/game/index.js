const mongoose = require('mongoose');
const TeamInfoSchema = require('./teamInfo');
const EventInfoSchema = require('./eventInfo');
const OfficialsSchema = require('./officials');

const GameSchema = mongoose.Schema({
  feedUrl: { type: String, required: true },
  league: {type: String, required: true},
  away_team: TeamInfoSchema,
  home_team: TeamInfoSchema,
  stats: { type: mongoose.Schema.Types.Mixed },
  totals: { type: mongoose.Schema.Types.Mixed },
  away_period_scores: [{ type: Number, required: true }],
  home_period_scores: [{ type: Number, required: true }],
  eventInfo: EventInfoSchema,
  officials: [OfficialsSchema],
  updatedAt: {type: Date, default: Date.now, required: false}
});

const Game = mongoose.model('Game', GameSchema);

module.exports = {
  Game,
  TeamInfoSchema,
  EventInfoSchema,
  OfficialsSchema,
};
