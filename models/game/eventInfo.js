const { Schema } = require('mongoose');
const SiteInfoSchema = require('./siteInfo');

const EventInfoSchema = Schema({
  temperature: {type: Number, required: false},
  attendance: {type: Number, required: false},
  duration: {type: String, required: false},
  status: {type: String, required: false},
  season_type: {type: String, required: false},
  start_date_time: {type: Date, required: true},
  site: SiteInfoSchema
});

module.exports = EventInfoSchema;
