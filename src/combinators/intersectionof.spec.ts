import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as o from "../objects";
import * as p from "../primitives";
import { IntersectionOf } from "./intersectionof";

export interface SimpleInterface {
  str: string;
  num: number;
  b: boolean;
}

/**
 * Compilation tests for the combinator types.
 */
@suite(timeout(3000), slow(5))
export class CombinatorsSpec {
  // This class is a wrapper around isUnion, most of the real tests happen there.
  @test public unionStringNumber() {
    const isSimpleInterface =
      new IntersectionOf(o.hasProperty("str", p.isString), o.hasProperty("num", p.isNumber))
        .with(o.hasProperty("b", p.isBoolean)).get();
    expect(isSimpleInterface({ str: "foo", num: 10, b: false })).to.equal(true);
    expect(isSimpleInterface({})).to.equal(false);
  }
}
