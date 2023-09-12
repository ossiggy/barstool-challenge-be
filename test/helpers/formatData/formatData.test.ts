import { assert } from "chai";
import { formatters } from "../../../helpers";
import { gameFields } from "../../../models";
import { nbaData } from "../../structures";

describe("formatData", () => {
  const cleaned = formatters.formatData(nbaData);
  it("should create the correct keys", () => {
    const hasKeys = gameFields.reduce(
      (acc, x) => acc && cleaned.hasOwnProperty(x),
      true
    );
    assert.equal(hasKeys, true);
  });
});
