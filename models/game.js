const mongoose = require('mongoose');

const TeamInfoSchema = mongoose.Schema({
  team_id: {type: String, required: true},
  abbreviation: {type: String, required: true},
  active: {type: Boolean, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  conference: {type: String, required: true},
  division: {type: String, required: true},
  site_name: {type: String, required: true},
  city: {type: String, required: true},
  full_name: {type: String, required: true},
})

mongoose.model('TeamInfo', TeamInfoSchema , 'TeamInfo')

const SiteInfoSchema = mongoose.Schema({
  capacity: {type: Number, required: false},
  surface: {type: String, required: false},
  name: {type: String, required: false},
  state: {type: String, required: false},
  city: {type: String, required: false},
})

mongoose.model('SiteInfo', SiteInfoSchema , 'SiteInfo')

const EventInfoSchema = mongoose.Schema({
  temperature: {type: Number, required: false},
  attendance: {type: Number, required: false},
  duration: {type: String, required: false},
  status: {type: String, required: false},
  season_type: {type: String, required: false},
  start_date_time: {type: Date, required: true},
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'SiteInfo' }
})

mongoose.model('EventInfo', EventInfoSchema , 'EventInfo')

const OfficialsScema = mongoose.Schema({
  position: {type: String, required: false},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
})

mongoose.model('Officials', OfficialsScema , 'Officials')

const GameModel = mongoose.Schema({
  league: {type: String, required: true},
  away_team: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamInfo' },
  home_team: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamInfo' },
  stats: { type: mongoose.Schema.Types.ObjectId },
  totals: { type: mongoose.Schema.Types.ObjectId },
  away_period_scores: [{ type: Number, required: true }],
  home_period_scores: [{ type: Number, required: true }],
  siteInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'SiteInfo' },
  eventInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'EventInfo' },
  officials: { type: mongoose.Schema.Types.ObjectId, ref: 'Officials' },
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

module.exports = {Game}