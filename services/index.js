const { getData } = require('./gameData');
const { createNba, updateNba, returnUpdatedNba } = require('./nbaService');
const {
  createMlb,
  updateMlb,
  cleanData,
  cleanPitchers,
  cleanFielders,
  returnUpdatedMlb 
} = require('./mlbService');

module.exports = {
  nbaService: {
    create: createNba,
    update: updateNba,
    returnUpdated: returnUpdatedNba
  },
  mlbService: {
    create: createMlb,
    update: updateMlb,
    cleanData,
    cleanPitchers,
    cleanFielders,
    returnUpdated: returnUpdatedMlb
  },
  gameService: {
    getData
  }
};
