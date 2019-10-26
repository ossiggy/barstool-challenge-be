const { getData } = require('./gameData');
const { createNba, updateNba, returnUpdatedNba } = require('./nbaService');
const { createMlb, updateMlb, returnUpdatedMlb } = require('./mlbService');

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
  gameService: {
    getData
  }
};
