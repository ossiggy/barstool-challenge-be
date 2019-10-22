const { create } = require('./nbaService');
const { update, returnUpdated } = require('./gameService');

module.exports = {
  nbaService: {
    create
  },
  gameService: {
    update,
    returnUpdated
  }
}