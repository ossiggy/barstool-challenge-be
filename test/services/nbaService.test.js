const assert = require('chai').assert;
const sinon = require('sinon');
const { Game, nbaPlayerFields } = require('../../models');
const { nbaService, gameService } = require('../../services');
const testData = require('../structures/nba.json')

describe('nbaService', () => {
  describe('cleanData', () => {
    const keys = [
      'feedUrl',
      'league',
      'away_team',
      'home_team',
      'away_period_scores',
      'home_period_scores',
      'stats',
      'totals',
      'eventInfo',
      'officials',
      'updatedAt',
    ];

    const cleaned = nbaService.cleanData(testData);

    it('should create the correct keys', () => {
      const hasKeys = keys.reduce((acc, x) => acc && cleaned.hasOwnProperty(x));
      assert.equal(hasKeys, true);
    });

    it('should create "away_stats" and "home_stats" keys under "stats"', () => {
      const { stats } = cleaned;
      assert.equal(stats.hasOwnProperty('away_stats'), true);
      assert.equal(stats.hasOwnProperty('home_stats'), true);
    });

    it('should create correct home and away player stats', () => {
      const { away_stats, home_stats } = cleaned.stats;
      const hasHomeKeys = nbaPlayerFields.reduce((acc, x) => acc && home_stats[0].hasOwnProperty(x));
      const hasAwayKeys = nbaPlayerFields.reduce((acc, x) => acc && away_stats[0].hasOwnProperty(x));
      assert.equal(hasHomeKeys, true);
      assert.equal(hasAwayKeys, true);
    });

    it('should create correct keys for "totals"', () => {
      const { totals } = cleaned;
      assert.equal(totals.hasOwnProperty('away_totals'), true);
      assert.equal(totals.hasOwnProperty('home_totals'), true);
    });

    it('should create correct keys for officials', () => {
      const { officials } = cleaned;
      assert.equal(officials[0].hasOwnProperty('position'), true);
      assert.equal(officials[0].hasOwnProperty('first_name'), true);
      assert.equal(officials[0].hasOwnProperty('last_name'), true);
    });
  });

  describe('update', () => {
    let sandbox = null;

    beforeEach('set sandbox', () => {
      sandbox = sinon.createSandbox();
    });

    afterEach('restore stub', () => {
      sandbox.restore();
    });

    it('should return an updated Game instance', (done) => {
      const newDate = new Date();
      const updateObj = Object.assign({}, testData, { feedUrl: 'foo.com', updatedAt: newDate });
      sandbox.stub(Game, 'findOneAndUpdate').resolves(nbaService.cleanData(updateObj));
      const result = nbaService.update({id: '12345', data: updateObj});
      done();
      assert.equal(result.feedUrl, 'foo.com');
      assert.equal(result.updatedAt, newDate);
      assert.equal(result instanceof Game, true);
    });
  });

  describe('returnUpdated', () => {
    let sandbox = null;

    beforeEach('set sandbox', () => {
      sandbox = sinon.createSandbox();
    });

    afterEach('restore stub', () => {
      sandbox.restore();
    });

    it('should retrieve new data and return an updated instance of Game', (done) => {
      const newDate = new Date();
      const updateObj = Object.assign({}, testData, { feedUrl: 'foo.com', updatedAt: newDate });
      sandbox.stub(gameService, 'getData').resolves(testData);
      sandbox.stub(nbaService, 'update').resolves(nbaService.cleanData(updateObj));
      const result = nbaService.returnUpdated({ id: '12345', feed: 'foo.com' });
      done();
      assert.equal(result.feedUrl, 'foo.com');
      assert.equal(result.updatedAt, newDate);
      assert.equal(result instanceof Game, true);
    });
  });

  describe('create', () => {
    it('should create a new instance of Game', () => {
      const result = nbaService.create(testData);
      assert.equal(result instanceof Game, true);
    });
  });
});