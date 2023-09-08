import { Schema } from "mongoose";
import SiteInfoSchema from "./siteInfo";

export const EventInfoSchema = new Schema({
  temperature: { type: Number, required: false },
  attendance: { type: Number, required: false },
  duration: { type: String, required: false },
  status: { type: String, required: false },
  season_type: { type: String, required: false },
  start_date_time: { type: Date, required: true },
  site: SiteInfoSchema,
});
