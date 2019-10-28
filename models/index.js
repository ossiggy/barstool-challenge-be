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
  gameFields,
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
  gameFields,
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
