const sinon = require('sinon');
const assert = require('chai').assert;
const testData = require('../structures/mlb.json');
const { mlbService, gameService } = require('../../services');
const {
  Game,
  mlbBatterFields,
  mlbPitcherFields,
  mlbFielderFields
} = require('../../models');

describe('mlbService', () => {
  describe('cleanPitchers', () => {
    it('should have correct home and away pitcher keys', () => {
      const homeCleaned = mlbService.cleanPitchers(testData.home_pitchers);
      const awayCleaned = mlbService.cleanPitchers(testData.away_pitchers);
      const hasHomeKeys = mlbPitcherFields.reduce((acc, x) => acc && homeCleaned[0].hasOwnProperty(x));
      const hasAwayKeys = mlbPitcherFields.reduce((acc, x) => acc && awayCleaned[0].hasOwnProperty(x));
      assert.isOk(homeCleaned, 'not a valid payload');
      assert.isOk(awayCleaned, 'not a valid payload');
      assert.equal(hasHomeKeys, true);
      assert.equal(hasAwayKeys, true);
    });
  });

  describe('cleanFielders', () => {
    it('should have correct home and away fielder keys', () => {
      const homeCleaned = mlbService.cleanFielders(testData.home_fielding);
      const awayCleaned = mlbService.cleanFielders(testData.away_fielding);
      const hasHomeKeys = mlbFielderFields.reduce((acc, x) => acc && homeCleaned[0].hasOwnProperty(x));
      const hasAwayKeys = mlbFielderFields.reduce((acc, x) => acc && awayCleaned[0].hasOwnProperty(x));
      assert.isOk(homeCleaned, 'not a valid payload');
      assert.isOk(awayCleaned, 'not a valid payload');
      assert.equal(hasHomeKeys, true);
      assert.equal(hasAwayKeys, true);
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

    it('should create the correct keys', () => {
      const hasKeys = keys.reduce((acc, x) => acc && cleaned.hasOwnProperty(x));
      assert.equal(hasKeys, true);
    });

    it('should create "away" and "home" keys under "stats"', () => {
      const { stats } = cleaned;
      assert.equal(stats.hasOwnProperty('away'), true);
      assert.equal(stats.hasOwnProperty('home'), true);
    });

    it('should create correct keys for "home" and "away"', () => {
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

    it('should create correct home and away batter keys', () => {
      const { home, away } = cleaned.stats;
      const hasHomeKeys = mlbBatterFields.reduce((acc, x) => acc && home.batters[0].hasOwnProperty(x));
      const hasAwayKeys = mlbBatterFields.reduce((acc, x) => acc && away.batters[0].hasOwnProperty(x));
      assert.equal(hasHomeKeys, true);
      assert.equal(hasAwayKeys, true);
    });

    it('should create correct keys for "totals"', () => {
      const { totals } = cleaned;
      assert.equal(totals.hasOwnProperty('away_batter_totals'), true);
      assert.equal(totals.hasOwnProperty('home_batter_totals'), true);
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
      sandbox.stub(Game, 'findOneAndUpdate').resolves(mlbService.cleanData(updateObj));
      const result = mlbService.update({id: '12345', data: updateObj});
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
      sandbox.stub(mlbService, 'update').resolves(mlbService.cleanData(updateObj));
      const result = mlbService.returnUpdated({ id: '12345', feed: 'foo.com' });
      done();
      assert.equal(result.feedUrl, 'foo.com');
      assert.equal(result.updatedAt, newDate);
      assert.equal(result instanceof Game, true);
    });
  });

  describe('create', () => {
    it('should create a new instance of Game', () => {
      const result = mlbService.create(testData);
      assert.equal(result instanceof Game, true);
    });
  });
});