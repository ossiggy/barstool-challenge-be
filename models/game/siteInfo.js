const { Schema } = require('mongoose');

const SiteInfoSchema = Schema({
  capacity: {type: Number, required: false},
  surface: {type: String, required: false},
  name: {type: String, required: false},
  state: {type: String, required: false},
  city: {type: String, required: false},
});

module.exports = SiteInfoSchema;
