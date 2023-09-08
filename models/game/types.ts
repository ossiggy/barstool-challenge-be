import { Model } from "mongoose";

export interface TeamInfoSchemaType {
  team_id: string;
  abbreviation: string;
  active: boolean;
  first_name: string;
  last_name: string;
  conference: string;
  division: string;
  site_name: string;
  city: string;
  full_name: string;
}

export interface OfficialsSchemaType {
  position?: string;
  first_name: string;
  last_name: string;
}

export interface SiteInfoSchemaType {
  capacity?: number;
  surface?: string;
  name?: string;
  state?: string;
  city?: string;
}

export interface EventInfoSchemaType {
  temperature?: number;
  attendance?: number;
  duration?: string;
  status?: string;
  season_type?: string;
  start_date_time: Date;
  site: SiteInfoSchemaType;
}

export interface GameStatsSchemaBaseProps {
  feedUrl: string;
  league: string;
  away_team: TeamInfoSchemaType;
  home_team: TeamInfoSchemaType;
  officials: OfficialsSchemaType[];
  away_period_scores: number[];
  home_period_scores: number[];
  event_information: EventInfoSchemaType;
  updatedAt: Date;
  stats?: any;
  totals?: any;
}

export interface GameStatsSchemaProps extends GameStatsSchemaBaseProps {
  apiRepr(): GameStatsSchemaBaseProps;
}

export interface GameStatsSchemaModel extends Model<GameStatsSchemaProps> {}
