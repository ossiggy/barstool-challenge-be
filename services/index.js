const { createNba, updateNba, returnUpdatedNba } = require('./nbaFormatter');
const { createMlb, updateMlb, returnUpdatedMlb } = require('./mlbFormatter');

module.exports = {
  nbaService: {
    create: createNba,
    update: updateNba,
    returnUpdated: returnUpdatedNba
  },
  mlbService: {
    create: createMlb,
    update: updateMlb,
    returnUpdated: returnUpdatedMlb
  },
};
