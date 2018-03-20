import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import { TypeGuard } from "../guards";
import * as p from "../primitives";
import { UnionOf } from "./unionof";

/**
 * Compilation tests for the UnionOf spec.
 */
@suite(timeout(3000), slow(5))
export class UnionOfSpec {
  @test public unionStringNumber() {
    const isNullableStringOrNumber: TypeGuard<string | number | null> =
      new UnionOf(p.isString)
        .with(p.isNumber)
        .with(p.isNull).get();
    expect(isNullableStringOrNumber("foo")).to.equal(true);
    expect(isNullableStringOrNumber(10)).to.equal(true);
    expect(isNullableStringOrNumber(null)).to.equal(true);
    expect(isNullableStringOrNumber(undefined)).to.equal(false);
  }

}
