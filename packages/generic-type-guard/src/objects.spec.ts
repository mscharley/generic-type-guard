import { expect } from "chai";
import * as c from "./combinators";
import { DummyClass, FullDummyClass } from "./dummy_classes.spec";
import * as o from "./objects";
import * as p from "./primitives";

/**
 * Compilation tests for the guard types.
 */
describe("Objects", function(this: Mocha.Suite) {
  this.slow(5).timeout(3000);

  it("record", () => {
    const hasFooString = o.isRecord("foo", p.isString);
    expect(hasFooString({ foo: "bar" })).to.equal(true);
    expect(hasFooString({ foo: 10 })).to.equal(false);
    expect(hasFooString({})).to.equal(false);
    expect(hasFooString({ bar: "foo" })).to.equal(false);
    expect(hasFooString(10)).to.equal(false);
    expect(hasFooString("foo")).to.equal(false);
  });

  it("property", () => {
    const hasFooString = o.hasProperty("foo", p.isString);
    expect(hasFooString({ foo: "bar" })).to.equal(true);
    expect(hasFooString({ foo: 10 })).to.equal(false);
    expect(hasFooString({})).to.equal(false);
    expect(hasFooString({ bar: "foo" })).to.equal(false);
  });

  it("propertyOfBaseClass", () => {
    const hasFooString = o.hasProperty("foo", p.isString);
    expect(hasFooString(new FullDummyClass())).to.equal(true);
  });

  it("propertyUndefined", () => {
    const hasMaybeFooString = o.hasProperty("foo", c.isUnion(p.isUndefined, p.isString));
    expect(hasMaybeFooString({ foo: "bar" })).to.equal(true);
    expect(hasMaybeFooString({})).to.equal(true);
    expect(hasMaybeFooString({ bar: "foo" })).to.equal(true);
  });

  it("stringIndex", () => {
    const hasStringStringIndex = o.hasStringIndexSignature(p.isString);
    expect(hasStringStringIndex({ foo: "bar" })).to.equal(true, "string index");
    expect(hasStringStringIndex({})).to.equal(false, "empty string index");
    expect(hasStringStringIndex(["foo"])).to.equal(false, "numeric index");
    expect(hasStringStringIndex({ foo: "bar", bar: 10 })).to.equal(false, "string index with number");
  });

  it("looseStringIndex", () => {
    const hasStringStringIndex = o.hasStringIndexSignature(p.isString, false);
    expect(hasStringStringIndex({ foo: "bar" })).to.equal(true, "string index");
    expect(hasStringStringIndex({})).to.equal(true, "empty string index");
    expect(hasStringStringIndex(["foo"])).to.equal(true, "numeric index");
    expect(hasStringStringIndex({ foo: "bar", bar: 10 })).to.equal(false, "string index with number");
  });

  it("numberIndex", () => {
    const hasNumberStringIndex = o.hasNumericIndexSignature(p.isString);
    expect(hasNumberStringIndex({ foo: "bar" })).to.equal(false, "string index");
    expect(hasNumberStringIndex(["foo"])).to.equal(true, "numeric index");
    expect(hasNumberStringIndex([])).to.equal(false, "empty numeric index");
    expect(hasNumberStringIndex(["foo", 10])).to.equal(false, "numeric index with number");
  });

  it("looseNumberIndex", () => {
    const hasNumberStringIndex = o.hasNumericIndexSignature(p.isString, false);
    expect(hasNumberStringIndex({ foo: "bar" })).to.equal(true, "string index");
    expect(hasNumberStringIndex(["foo"])).to.equal(true, "numeric index");
    expect(hasNumberStringIndex([])).to.equal(true, "empty numeric index");
    expect(hasNumberStringIndex(["foo", 10])).to.equal(false, "numeric index with number");
  });

  it("instance", () => {
    const isDummyClass = o.isInstance(DummyClass);
    expect(isDummyClass(new DummyClass())).to.equal(true);
    // Basic objects should not work.
    expect(isDummyClass({})).to.equal(false);
    // Objects that are structurally similar should not work.
    expect(isDummyClass({ foo: "bar" })).to.equal(false);
    expect(isDummyClass("foo")).to.equal(false);
  });

  it("properties", () => {
    const hasProps = o.hasProperties({ foo: p.isString, bar: p.isNumber });
    expect(hasProps({ foo: "foo", bar: 1 })).to.equal(true);
    expect(hasProps({ foo: "foo" })).to.equal(false);
    expect(hasProps({ foo: "foo", bar: "1" })).to.equal(false);
  });
});
