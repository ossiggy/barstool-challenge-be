const mongoose = require('mongoose');

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
  gameInfo: Schema.types.mixed,
  updatedAt: {type: Date, default: Date.now, required: false}
}, { strict: false });

GameModel.methods.apiRepr = () => {
  return {
    id: this._id || '',
    league: this.league.toLowerCase() || '',
    gameInfo: this.gameInfo || '',
    updatedAt: this.updatedAt.toDateString() || ''
  };
};

const Game = mongoose.model('Game', GameSchema);

module.exports = {Game}