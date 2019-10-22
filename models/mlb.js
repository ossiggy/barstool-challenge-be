const mongoose = require('mongoose');

const BatterSchema = mongoose.Schema({
  last_name: {type: String, required: true},
  first_name: {type: String, required: true},
  display_name: {type: String, required: true},
  position: {type: String, required: true},
  bat_order: {type: Number, required: true},
  sub_bat_order: {type: Number, required: true},
  sacrifices: {type: Number, required: true},
  at_bats: {type: Number, required: true},
  plate_appearances: {type: Number, required: true},
  singles: {type: Number, required: true},
  doubles: {type: Number, required: true},
  triples: {type: Number, required: true},
  home_runs: {type: Number, required: true},
  sac_flies: {type: Number, required: true},
  sac_hits: {type: Number, required: true},
  stolen_bases: {type: Number, required: true},
  caught_stealing: {type: Number, required: true},
  rbi_with_two_outs: {type: Number, required: true},
  total_bases: {type: Number, required: true},
  runs: {type: Number, required: true},
  hits: {type: Number, required: true},
  rbi: {type: Number, required: true},
  walks: {type: Number, required: true},
  strike_outs: {type: Number, required: true},
  left_on_base: {type: Number, required: true},
  hit_by_pitch: {type: Number, required: true},
  team_abbreviation: {type: String, required: true},
  ops: {type: Number, required: true},
  avg: {type: Number, required: true},
  obp: {type: Number, required: true},
  slg: {type: Number, required: true},
  at_bats_per_home_run: {type: Number, required: true},
  at_bats_per_rbi: {type: Number, required: true},
  walk_rate: {type: Number, required: true},
  plate_appearances_per_rbi: {type: Number, required: true},
  plate_appearances_per_home_run: {type: Number, required: true},
  extra_base_hits: {type: Number, required: true},
  stolen_base_average: {type: Number, required: true},
  strikeout_rate: {type: Number, required: true},
  ops_string: {type: String, required: true},
  slg_string: {type: String, required: true},
  obp_string: {type: String, required: true},
  avg_string: {type: String, required: true},
  batting_highlights: {type: String, required: true},
})

mongoose.model('Batter', BatterSchema, 'Batter')

const PitcherSchema = mongoose.Schema({
  last_name: {type: String, required: true},
  first_name: {type: String, required: true},
  display_name: {type: String, required: true},
  pitch_order: {type: Number, required: true},
  win: {type: Boolean, required: true},
  loss: {type: Boolean, required: true},
  save: {type: Boolean, required: true},
  hold: {type: Boolean, required: true},
  era: {type: Number, required: true},
  whip: {type: Number, required: true},
  innings_pitched: {type: Number, required: true},
  hits_allowed: {type: Number, required: true},
  runs_allowed: {type: Number, required: true},
  earned_runs: {type: Number, required: true},
  walks: {type: Number, required: true},
  intentional_walks: {type: Number, required: true},
  strike_outs: {type: Number, required: true},
  home_runs_allowed: {type: Number, required: true},
  pitch_count: {type: Number, required: true},
  pitches_strikes: {type: Number, required: true},
  wild_pitches: {type: Number, required: true},
  hit_by_pitch: {type: Number, required: true},
  errors: {type: Number, required: true},
  team_abbreviation: {type: String, required: true}
})

mongoose.model('Pitcher', PitcherSchema, 'Pitcher')

const FielderSchema = mongoose.Schema({
  last_name: {type: String, required: true},
  first_name: {type: String, required: true},
  display_name: {type: String, required: true},
  errors: {type: Number, required: true},
  team_abbreviation: {type: String, required: true},
})

mongoose.model('Fielder', FielderSchema, 'Fielder')

const NbaSchema = mongoose.Schema({
   away_stats: [{type: mongoose.Schema.Types.ObjectId, ref: 'NbaPlayerStats'}],
   home_stats: [{type: mongoose.Schema.Types.ObjectId, ref: 'NbaPlayerStats'}],
});

NbaSchema.methods.apiRepr = function() {
  return {
    id: this._id || '',
    away_stats: this.away_stats || '',
    content: this.content || '',
    dateCreated: this.dateCreated.toDateString() || '',
    category: this.category || ''
  };
};

const NBA = mongoose.model('NBA', NbaSchema);

module.exports = { NBA }