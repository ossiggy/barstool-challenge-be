import { Schema } from "mongoose";

export const OfficialsSchema = new Schema({
  position: { type: String, required: false },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});
