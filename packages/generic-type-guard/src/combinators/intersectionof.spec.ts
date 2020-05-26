import * as o from "../objects";
import * as p from "../primitives";
import { expect } from "chai";
import { IntersectionOf } from "./intersectionof";
import { PartialTypeGuard } from "../guards";

/* eslint-disable no-magic-numbers */

export interface SimpleInterface {
  str: string;
  num: number;
  b: boolean;
}

/**
 * Compilation tests for the IntersectionOf class.
 */
describe("IntersectionOf", function(this: Mocha.Suite) {
  this.slow(5).timeout(3000);

  // This class is a wrapper around isUnion, most of the real tests happen there.
  it("unionStringNumber", () => {
    const isSimpleInterface: PartialTypeGuard<object, SimpleInterface> =
      new IntersectionOf(o.hasProperty("str", p.isString))
        .with(o.hasProperty("num", p.isNumber))
        .with(o.hasProperty("b", p.isBoolean)).get();
    expect(isSimpleInterface({ str: "foo", num: 10, b: false })).to.equal(true);
    expect(isSimpleInterface({})).to.equal(false);
  });
});
