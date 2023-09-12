import type { MlbGameStatsProps, NbaGameStatsProps } from "../helpers/types";
import type { GameStatsSchemaBaseProps } from "../models/game/types";

export type GetGameData = (url: string) => Promise<String | undefined>;
export type UpdateGameInfo = (
  id: string,
  data: any
) => Promise<GameStatsSchemaBaseProps | unknown>;
export type ReturnUpdatedGameInfo = (
  id: string,
  feed: string
) => UpdateGameInfo | unknown;

export type CreateGameInfo = (
  params: MlbGameStatsProps | NbaGameStatsProps
) => GameStatsSchemaBaseProps | unknown;
