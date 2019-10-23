const {
  NBA,
  nbaFields,
  NbaTotalsSchema,
  NbaPlayerStatsSchema,
} = require('./nba');

const {
  MLB,
  mlbFields,
  BatterSchema,
  PitcherSchema,
  FielderSchema,
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
  BatterTotalsSchema,
  NbaPlayerStatsSchema,
};
