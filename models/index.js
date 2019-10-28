const {
  NBA,
  nbaFields,
  nbaPlayerFields,
  NbaTotalsSchema,
  NbaPlayerStatsSchema,
} = require('./nba');

const {
  MLB,
  mlbFields,
  BatterSchema,
  PitcherSchema,
  FielderSchema,
  mlbBatterFields,
  mlbPitcherFields,
  mlbFielderFields,
  BatterTotalsSchema,
} = require('./mlb');

const { 
  Game,
  TeamInfoSchema,
  EventInfoSchema,
  OfficialsSchema,
 } = require('./game');

module.exports = {
  NBA,
  MLB,
  Game,
  nbaFields,
  mlbFields,
  BatterSchema,
  PitcherSchema,
  FielderSchema,
  TeamInfoSchema,
  EventInfoSchema,
  OfficialsSchema,
  NbaTotalsSchema,
  nbaPlayerFields,
  mlbBatterFields,
  mlbPitcherFields,
  mlbFielderFields,
  BatterTotalsSchema,
  NbaPlayerStatsSchema,
};
