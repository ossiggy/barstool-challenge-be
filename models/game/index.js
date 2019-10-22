const mongoose = require('mongoose');
const TeamInfoSchema = require('./teamInfo');
const SiteInfoSchema = require('./siteInfo');
const EventInfoSchema = require('./eventInfo');
const OfficialsSchema = require('./officials');

const GameModel = mongoose.Schema({
  league: {type: String, required: true},
  away_team: TeamInfoSchema,
  home_team: TeamInfoSchema,
  stats: { type: mongoose.Schema.Types.ObjectId },
  totals: { type: mongoose.Schema.Types.ObjectId },
  away_period_scores: [{ type: Number, required: true }],
  home_period_scores: [{ type: Number, required: true }],
  siteInfo: SiteInfoSchema,
  eventInfo: EventInfoSchema,
  officials: OfficialsSchema,
  updatedAt: {type: Date, default: Date.now, required: true}
});

GameModel.methods.apiRepr = () => {
  return {
    id: this._id || '',
    league: this.league.toLowerCase() || '',
    stats: this.stats || '',
    totals: this.totals || '',
    away_period_scores: this.away_period_scores || '',
    home_period_scores: this.home_period_scores || '',
    siteInfo: this.siteInfo || '',
    eventInfo: this.eventInfo || '',
    officials: this.officials || '',
    updatedAt: this.updatedAt.toDateString() || ''
  };
};

const Game = mongoose.model('Game', GameSchema, 'Game');

module.exports = Game;
