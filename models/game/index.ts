import { Schema, model } from "mongoose";
import { TeamInfoSchema } from "./teamInfo";
import { EventInfoSchema } from "./eventInfo";
import { OfficialsSchema } from "./officials";
import type { GameStatsSchemaModel, GameStatsSchemaProps } from "./types";

export const GameStatsSchema = new Schema({
  feedUrl: { type: String, required: true },
  league: { type: String, required: true },
  away_team: TeamInfoSchema,
  home_team: TeamInfoSchema,
  stats: { type: mongoose.Schema.Types.Mixed },
  totals: { type: mongoose.Schema.Types.Mixed },
  away_period_scores: [{ type: Number, required: true }],
  home_period_scores: [{ type: Number, required: true }],
  eventInfo: EventInfoSchema,
  officials: [OfficialsSchema],
  updatedAt: { type: Date, default: Date.now, required: false },
});

// arrow functions not possible here, since they close over lexically enclosing context (i.e: this remains this)

GameStatsSchema.method("apiRepr", function () {
  return {
    id: this._id.toString(),
    feedUrl: this.feedUrl || "",
    league: this.league || "",
    away_team: this.away_team || {},
    home_team: this.home_team || {},
    stats: this.stats || [],
    totals: this.totals || [],
    away_period_scores: this.away_period_scores || [],
    home_period_scores: this.home_period_scores || [],
    eventInfo: this.eventInfo || {},
    officials: this.officials || [],
    updatedAt: this.Date || "",
  };
});

export const GameStats: GameStatsSchemaModel = model<
  GameStatsSchemaProps,
  GameStatsSchemaModel
>("GameStats", GameStatsSchema);

export default GameStats;
