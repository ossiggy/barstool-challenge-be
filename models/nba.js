const mongoose = require('mongoose');

const NbaPlayerStatsSchema = mongoose.Schema({
  last_name: {type: String, required: true},
  first_name: {type: String, required: true},
  display_name: {type: String, required: true},
  position: {type: String, required: true},
  minutes: {type: Number, required: true},
  points: {type: Number, required: true},
  assists: {type: Number, required: true},
  turnovers: {type: Number, required: true},
  steals: {type: Number, required: true},
  blocks: {type: Number, required: true},
  field_goals_attempted: {type: Number, required: true},
  field_goals_made: {type: Number, required: true},
  three_point_field_goals_attempted: {type: Number, required: true},
  three_point_field_goals_made: {type: Number, required: true},
  free_throws_attempted: {type: Number, required: true},
  free_throws_made: {type: Number, required: true},
  defensive_rebounds: {type: Number, required: true},
  offensive_rebounds: {type: Number, required: true},
  personal_fouls: {type: Number, required: true},
  team_abbreviation: {type: String, required: true},
  is_starter: {type: Boolean, required: true},
  field_goal_percentage: {type: Number, required: true},
  three_point_percentage: {type: Number, required: true},
  free_throw_percentage: {type: Number, required: true},
})

mongoose.model('NbaPlayerStats', NbaPlayerStatsSchema)

const NbaSchema = mongoose.Schema({
   away_stats: [{type: mongoose.Schema.Types.ObjectId, ref: 'NbaPlayerStats'}],
   home_stats: [{type: mongoose.Schema.Types.ObjectId, ref: 'NbaPlayerStats'}],
});

NbaSchema.methods.apiRepr = function() {
  return {
    id: this._id || '',
    away_stats: this.away_stats || '',
    home_stats: this.home_stats || '',
  };
};

const NBA = mongoose.model('NBA', NbaSchema, 'NBA');

module.exports = { NBA }