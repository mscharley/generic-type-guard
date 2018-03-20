import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import { PartialTypeGuard } from "../guards";
import * as o from "../objects";
import * as p from "../primitives";
import { IntersectionOf } from "./intersectionof";

export interface SimpleInterface {
  str: string;
  num: number;
  b: boolean;
}

/**
 * Compilation tests for the IntersectionOf class.
 */
@suite(timeout(3000), slow(5))
export class IntersectionOfSpec {
  // This class is a wrapper around isUnion, most of the real tests happen there.
  @test public unionStringNumber() {
    const isSimpleInterface: PartialTypeGuard<{}, SimpleInterface> =
      new IntersectionOf(o.hasProperty("str", p.isString))
        .with(o.hasProperty("num", p.isNumber))
        .with(o.hasProperty("b", p.isBoolean)).get();
    expect(isSimpleInterface({ str: "foo", num: 10, b: false })).to.equal(true);
    expect(isSimpleInterface({})).to.equal(false);
  }
}
