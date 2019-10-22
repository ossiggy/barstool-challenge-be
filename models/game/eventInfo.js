const { Schema } = require('mongoose');

const EventInfoSchema = Schema({
  temperature: {type: Number, required: false},
  attendance: {type: Number, required: false},
  duration: {type: String, required: false},
  status: {type: String, required: false},
  season_type: {type: String, required: false},
  start_date_time: {type: Date, required: true},
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'SiteInfo' }
});

module.exports = EventInfoSchema;
