const {
  NBA,
  NbaTotalsSchema,
  NbaPlayerStatsSchema,
} = require('./nba');

const {
  MLB,
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
