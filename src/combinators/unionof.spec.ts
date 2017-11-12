import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as p from "../primitives";
import { UnionOf } from "./unionof";

/**
 * Compilation tests for the combinator types.
 */
@suite(timeout(3000), slow(5))
export class CombinatorsSpec {
  @test public unionStringNumber() {
    const isNullableStringOrNumber =
      new UnionOf(p.isString, p.isNumber).with(p.isNull).get();
    expect(isNullableStringOrNumber("foo")).to.equal(true);
    expect(isNullableStringOrNumber(10)).to.equal(true);
    expect(isNullableStringOrNumber(null)).to.equal(true);
    expect(isNullableStringOrNumber(undefined)).to.equal(false);
  }

}
