import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as c from "./combinators";
import * as p from "./primitives";

/**
 * Compilation tests for the combinator types.
 */
@suite(timeout(3000), slow(5))
export class CombinatorsSpec {
  @test public unionStringNumber() {
    const isStringOrNumber = c.isUnion(p.isNumber, p.isString);

    expect(isStringOrNumber("foo")).to.equal(true);
    expect(isStringOrNumber(5)).to.equal(true);
    expect(isStringOrNumber(null)).to.equal(false);
  }
}
