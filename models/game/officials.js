const { Schema } = require('mongoose');

const OfficialsSchema = Schema({
  position: {type: String, required: false},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
});

module.exports = OfficialsSchema;
