import type {
  GameStatsSchemaBaseProps,
  MlbSchemaBaseProps,
  NbaSchemaBaseProps,
} from "../models";

export interface MlbGameStatsProps
  extends GameStatsSchemaBaseProps,
    MlbSchemaBaseProps {}

export interface NbaGameStatsProps
  extends GameStatsSchemaBaseProps,
    NbaSchemaBaseProps {}
