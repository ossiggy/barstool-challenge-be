const { router: nbaRouter } = require('./nbaController');
const { router: mlbRouter } = require('./mlbController');

module.exports = {
  nbaRouter,
  mlbRouter,
};
