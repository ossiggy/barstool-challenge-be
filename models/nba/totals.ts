import { Schema } from "mongoose";

export const NbaTotalsSchema = new Schema({
  minutes: { type: Number, required: true },
  points: { type: Number, required: true },
  assists: { type: Number, required: true },
  turnovers: { type: Number, required: true },
  steals: { type: Number, required: true },
  blocks: { type: Number, required: true },
  field_goals_attempted: { type: Number, required: true },
  field_goals_made: { type: Number, required: true },
  three_point_field_goals_attempted: { type: Number, required: true },
  three_point_field_goals_made: { type: Number, required: true },
  free_throws_attempted: { type: Number, required: true },
  free_throws_made: { type: Number, required: true },
  defensive_rebounds: { type: Number, required: true },
  offensive_rebounds: { type: Number, required: true },
  personal_fouls: { type: Number, required: true },
  is_starter: { type: Boolean, required: true },
  field_goal_percentage: { type: Number, required: true },
  three_point_percentage: { type: Number, required: true },
  free_throw_percentage: { type: Number, required: true },
});
