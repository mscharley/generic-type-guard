import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import { DummyClass } from "./dummy_class.spec";
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

  @test public instance() {
    const isDummyClass = o.isInstance(DummyClass);
    expect(isDummyClass(new DummyClass())).to.equal(true);
    // Basic objects should not work.
    expect(isDummyClass({})).to.equal(false);
    // Objects that are structurally similar should not work.
    expect(isDummyClass({ foo: "bar" })).to.equal(false);
    expect(isDummyClass("foo")).to.equal(false);
  }
}
