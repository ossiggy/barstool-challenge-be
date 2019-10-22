const mongoose = require('mongoose');

const BatterSchema = require('./batters');
const PitcherSchema = require('./pitchers');
const FielderSchema = require('./fielders');
const BatterTotalsSchema = require('./totals');

const MlbSchema = mongoose.Schema({
  away_errors: {type: Number, required: true},
  home_errors: {type: Number, required: true},
  away_batters: [BatterSchema],
  home_batters: [BatterSchema],
  away_pitchers: [PitcherSchema],
  home_pitchers: [PitcherSchema],
  away_fielding: [FielderSchema],
  home_fielding: [FielderSchema],
  away_batter_totals: BatterTotalsSchema,
  home_batter_totals: BatterTotalsSchema,
});

MlbSchema.methods.apiRepr = () => {
  return {
    id: this._id || '',
    away_errors: this.away_errors || '',
    home_errors: this.home_errors || '',
    away_batters: this.away_batters || '',
    home_batters: this.home_batters || '',
    away_pitchers: this.away_pitchers || '',
    home_pitchers: this.away_pitchers || '',
    away_fielding: this.away_fielding || '',
    home_fielding: this.home_fielding || '',
    away_batter_totals: this.away_batter_totals || '',
    home_batter_totals: this.home_batter_totals || '',
  };
};

const MLB = mongoose.model('MLB', MlbSchema);

module.exports = {
  MLB,
  BatterSchema,
  PitcherSchema,
  FielderSchema,
  BatterTotalsSchema,
};
