import { Model } from "mongoose";

export interface NbaPlayerStatsSchemaType {
  last_name: string;
  first_name: string;
  display_name: string;
  position: string;
  minutes: number;
  points: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
  field_goals_attempted: number;
  field_goals_made: number;
  three_point_field_goals_attempted: number;
  three_point_field_goals_made: number;
  free_throws_attempted: number;
  free_throws_made: number;
  defensive_rebounds: number;
  offensive_rebounds: number;
  personal_fouls: number;
  team_abbreviation: string;
  is_starter: boolean;
  field_goal_percentage: number;
  three_point_percentage: number;
  free_throw_percentage: number;
}

export interface NbaTotalsSchemaType {
  minutes: number;
  points: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
  field_goals_attempted: number;
  field_goals_made: number;
  three_point_field_goals_attempted: number;
  three_point_field_goals_made: number;
  free_throws_attempted: number;
  free_throws_made: number;
  defensive_rebounds: number;
  offensive_rebounds: number;
  personal_fouls: number;
  is_starter: boolean;
  field_goal_percentage: number;
  three_point_percentage: number;
  free_throw_percentage: number;
}

export interface NbaSchemaBaseProps {
  away_stats: NbaPlayerStatsSchemaType[];
  home_stats: NbaPlayerStatsSchemaType[];
  away_totals: NbaTotalsSchemaType;
  home_totals: NbaTotalsSchemaType;
}

export interface NbaSchemaProps extends NbaSchemaBaseProps {
  apiRepr(): NbaSchemaBaseProps;
}

export interface NbaSchemaModel extends Model<NbaSchemaProps> {}
