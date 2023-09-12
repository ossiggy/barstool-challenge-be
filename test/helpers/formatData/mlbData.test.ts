import { assert } from "chai";
import { formatters } from "../../../helpers";
import {
  mlbBatterFields,
  mlbPitcherFields,
  mlbFielderFields,
} from "../../../models";
import testData from "../../structures/mlb.json";

describe("mlbData", () => {
  describe("cleanPitchers", () => {
    it("should have correct home and away pitcher keys", () => {
      const homeCleaned = formatters.cleanPitchers(testData.home_pitchers);
      const awayCleaned = formatters.cleanPitchers(testData.away_pitchers);
      const hasHomeKeys = mlbPitcherFields.reduce((acc, x) => {
        return acc && homeCleaned[0].hasOwnProperty(x);
      }, true);
      const hasAwayKeys = mlbPitcherFields.reduce(
        (acc, x) => acc && awayCleaned[0].hasOwnProperty(x),
        true
      );
      assert.isOk(homeCleaned, "not a valid payload");
      assert.isOk(awayCleaned, "not a valid payload");
      assert.equal(hasHomeKeys, true);
      assert.equal(hasAwayKeys, true);
    });
  });

  describe("cleanFielders", () => {
    it("should have correct home and away fielder keys", () => {
      const homeCleaned = formatters.cleanFielders(testData.home_fielding);
      const awayCleaned = formatters.cleanFielders(testData.away_fielding);
      const hasHomeKeys = mlbFielderFields.reduce(
        (acc, x) => acc && homeCleaned[0].hasOwnProperty(x),
        true
      );
      const hasAwayKeys = mlbFielderFields.reduce(
        (acc, x) => acc && awayCleaned[0].hasOwnProperty(x),
        true
      );
      assert.isOk(homeCleaned, "not a valid payload");
      assert.isOk(awayCleaned, "not a valid payload");
      assert.equal(hasHomeKeys, true);
      assert.equal(hasAwayKeys, true);
    });
  });

  describe("formatMlbData", () => {
    const cleaned = formatters.formatData(testData);

    it('should create "away" and "home" keys under "stats"', () => {
      const { stats } = cleaned;
      assert.equal(stats.hasOwnProperty("away"), true);
      assert.equal(stats.hasOwnProperty("home"), true);
    });

    it('should create correct keys for "home" and "away"', () => {
      const { home, away } = cleaned.stats;
      const statsKeys = ["_errors", "batters", "pitchers", "fielding"];

      const awayKeys = statsKeys.reduce(
        (acc, x) => acc && away.hasOwnProperty(x),
        true
      );
      const homeKeys = statsKeys.reduce(
        (acc, x) => acc && home.hasOwnProperty(x),
        true
      );
      assert.equal(awayKeys, true);
      assert.equal(homeKeys, true);
    });

    it("should create correct home and away batter keys", () => {
      const { home, away } = cleaned.stats;
      const hasHomeKeys = mlbBatterFields.reduce(
        (acc, x) => acc && home.batters[0].hasOwnProperty(x),
        true
      );
      const hasAwayKeys = mlbBatterFields.reduce(
        (acc, x) => acc && away.batters[0].hasOwnProperty(x),
        true
      );
      assert.equal(hasHomeKeys, true);
      assert.equal(hasAwayKeys, true);
    });

    it('should create correct keys for "totals"', () => {
      const { totals } = cleaned;
      assert.equal(totals.hasOwnProperty("away"), true);
      assert.equal(totals.hasOwnProperty("home"), true);
    });

    it("should create correct keys for officials", () => {
      const { officials } = cleaned;
      assert.equal(officials[0].hasOwnProperty("position"), true);
      assert.equal(officials[0].hasOwnProperty("first_name"), true);
      assert.equal(officials[0].hasOwnProperty("last_name"), true);
    });
  });
});
