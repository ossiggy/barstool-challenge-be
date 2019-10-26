const { getData } = require('./gameData');
const {
  createNba,
  updateNba,
  cleanNbaData,
  returnUpdatedNba
} = require('./nbaService');
const {
  createMlb,
  updateMlb,
  cleanMlbData,
  cleanPitchers,
  cleanFielders,
  returnUpdatedMlb 
} = require('./mlbService');

module.exports = {
  nbaService: {
    create: createNba,
    update: updateNba,
    cleanData: cleanNbaData,
    returnUpdated: returnUpdatedNba
  },
  mlbService: {
    create: createMlb,
    update: updateMlb,
    cleanData: cleanMlbData,
    cleanPitchers,
    cleanFielders,
    returnUpdated: returnUpdatedMlb
  },
  gameService: {
    getData
  }
};
