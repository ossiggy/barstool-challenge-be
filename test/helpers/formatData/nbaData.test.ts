import { assert } from "chai";
import { formatters } from "../../../helpers";
import { nbaPlayerFields } from "../../../models";
import testData from "../../structures/nba.json";

describe("nbaData", () => {
  describe("formatNbaData", () => {
    const cleaned = formatters.formatData(testData);

    it('should create "away" and "home" keys under "stats"', () => {
      const { stats } = cleaned;
      assert.equal(stats.hasOwnProperty("away"), true);
      assert.equal(stats.hasOwnProperty("home"), true);
    });

    it("should create correct home and away player stats", () => {
      const { away, home } = cleaned.stats;
      const hasHomeKeys = nbaPlayerFields.reduce(
        (acc, x) => acc && home[0].hasOwnProperty(x),
        true
      );
      const hasAwayKeys = nbaPlayerFields.reduce(
        (acc, x) => acc && away[0].hasOwnProperty(x),
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
