import * as p from "../primitives";
import { expect } from "chai";
import { TypeGuard } from "../guards";
import { UnionOf } from "./unionof";

/* eslint-disable no-magic-numbers */

/**
 * Compilation tests for the UnionOf spec.
 */
describe("UnionOf", function(this: Mocha.Suite) {
  this.slow(5).timeout(3000);

  it("unionStringNumber", () => {
    const isNullableStringOrNumber: TypeGuard<string | number | null> =
      new UnionOf(p.isString)
        .with(p.isNumber)
        .with(p.isNull).get();
    expect(isNullableStringOrNumber("foo")).to.equal(true);
    expect(isNullableStringOrNumber(10)).to.equal(true);
    expect(isNullableStringOrNumber(null)).to.equal(true);
    expect(isNullableStringOrNumber(undefined)).to.equal(false);
  });
});
