import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as o from "./objects";
import * as p from "./primitives";

/**
 * Compilation tests for the guard types.
 */
@suite(timeout(3000), slow(5))
export class ObjectsSpec {
  @test public property() {
    const hasFooString = o.hasProperty("foo", p.isString);
    expect(hasFooString({ foo: "bar" })).to.equal(true);
    expect(hasFooString({})).to.equal(false);
    expect(hasFooString({ bar: "foo" })).to.equal(false);
  }
}
