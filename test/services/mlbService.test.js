const assert = require('chai').assert;
const sinon = require('sinon');
const { Game } = require('../../models');
const { mlbService } = require('../../services');
const testData = require('../structures/mlb.json')

describe('mlbService', () => {
  describe('cleanPitchers', () => {
    it('should replace "errors" and "save" with "_errors" and "_save"', () => {
      const payload = [{errors: 'foo', save: 'bar'}];
      const cleaned = mlbService.cleanPitchers(payload)
      assert.isOk(cleaned, 'not a valid payload');
      assert.deepEqual(Object.keys(cleaned[0]), ['_errors', '_save'])
    });
  });

  describe('cleanFielders', () => {
    it('should replace "errors" with "_errors"', () => {
      const payload = [{errors: 'foo'}];
      const cleaned = mlbService.cleanFielders(payload)
      assert.isOk(cleaned, 'not a valid payload');
      assert.deepEqual(Object.keys(cleaned[0]), ['_errors'])
    });
  });

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

    const cleaned = mlbService.cleanData(testData);

    it('should have the correct keys', () => {
      const hasKeys = keys.reduce((acc, x) => acc && cleaned.hasOwnProperty(x));
      assert.equal(hasKeys, true);
    });

    it('should have "away" and "home" keys under "stats"', () => {
      const { stats } = cleaned;
      assert.equal(stats.hasOwnProperty('away'), true);
      assert.equal(stats.hasOwnProperty('home'), true);
    });

    it('should have correct keys for "home" and "away"', () => {
      const { home, away } = cleaned.stats;
      const statsKeys = [
        '_errors',
        'batters',
        'pitchers',
        'fielding',
      ];

      const awayKeys = statsKeys.reduce((acc, x) => acc && away.hasOwnProperty(x));
      const homeKeys = statsKeys.reduce((acc, x) => acc && home.hasOwnProperty(x));
      assert.equal(awayKeys, true);
      assert.equal(homeKeys, true);
    });

    it('should have correct keys for "totals"', () => {
      const { totals } = cleaned;
      assert.equal(totals.hasOwnProperty('away_batter_totals'), true);
      assert.equal(totals.hasOwnProperty('home_batter_totals'), true);
    });

    it('should have correct keys for officials', () => {
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

    it('should return an updated Game instance', () => {
      const newDate = new Date();
      const updateObj = Object.assign({}, testData, { feedUrl: 'foo.com', updatedAt: newDate });
      const stubUpdate = sandbox.stub(Game, 'findOneAndUpdate').yields(null, updateObj);
      const result = mlbService.update({id: '12345', data: updateObj});
      assert.equal(result.feedUrl, 'foo.com');
      assert.equal(result.updatedAt, newDate);
    });
  });
});