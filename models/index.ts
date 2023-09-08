const {
  NBA,
  nbaFields,
  nbaPlayerFields,
  NbaTotalsSchema,
  NbaPlayerStatsSchema,
} = require("./nba");

export { MlbStats } from "./mlb";
export type {
  BatterSchemaType,
  PitcherSchemaType,
  BatterTotalsSchemaType,
  FielderSchemaType,
  MlbSchemaBaseProps,
} from "./mlb/types";

export { GameStats } from "./game";
export type {
  TeamInfoSchemaType,
  OfficialsSchemaType,
  SiteInfoSchemaType,
  EventInfoSchemaType,
  GameStatsSchemaBaseProps,
} from "./game/types";
