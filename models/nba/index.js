const mongoose = require('mongoose');
const NbaTotalsSchema = require('./totals');
const NbaPlayerStatsSchema = require('./stats');
const { nbaFields, nbaPlayerFields } = require('./requiredFields');

const NbaSchema = mongoose.Schema({
   away_stats: [NbaPlayerStatsSchema],
   home_stats: [NbaPlayerStatsSchema],
   away_totals: NbaTotalsSchema,
   home_totals: NbaTotalsSchema
});

NbaSchema.methods.apiRepr = function() {
  return {
    id: this._id || '',
    away_stats: this.away_stats || '',
    home_stats: this.home_stats || '',
  };
};

const NBA = mongoose.model('NBA', NbaSchema, 'NBA');

module.exports = {
  NBA,
  nbaFields,
  nbaPlayerFields,
  NbaTotalsSchema,
  NbaPlayerStatsSchema,
};
