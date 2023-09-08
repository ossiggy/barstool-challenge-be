import { Schema } from "mongoose";

import { gameFields } from "./requiredFields";
import { TeamInfoSchema } from "./teamInfo";
import { EventInfoSchema } from "./eventInfo";
import { OfficialsSchema } from "./officials";

const GameSchema = new Schema({
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

const Game = mongoose.model("Game", GameSchema);
