import { Schema, model } from "mongoose";
import { NbaTotalsSchema } from "./totals";
import { NbaPlayerStatsSchema } from "./stats";

import type { NbaSchemaModel, NbaSchemaProps } from "./types";

export const NbaStatsSchema = new Schema({
  away_stats: [NbaPlayerStatsSchema],
  home_stats: [NbaPlayerStatsSchema],
  away_totals: NbaTotalsSchema,
  home_totals: NbaTotalsSchema,
});

NbaStatsSchema.methods.apiRepr = function () {
  return {
    id: this._id || "",
    away_stats: this.away_stats || "",
    home_stats: this.home_stats || "",
  };
};

export const NbaStats: NbaSchemaModel = model<NbaSchemaProps, NbaSchemaModel>(
  "NbaStats",
  NbaStatsSchema
);

export default NbaStats;
