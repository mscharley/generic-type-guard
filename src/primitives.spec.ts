import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as p from "./primitives";

/**
 * Compilation tests for the primitive types.
 */
@suite(timeout(3000), slow(5))
export class PrimitivesSpec {
  @test public string() {
    expect(p.isString("foo")).to.equal(true);
    expect(p.isString(10)).to.equal(false);
  }

  @test public number() {
    expect(p.isNumber(10)).to.equal(true);
    expect(p.isNumber("foo")).to.equal(false);
  }

  @test public boolean() {
    expect(p.isBoolean(true)).to.equal(true);
    expect(p.isBoolean(false)).to.equal(true);
    expect(p.isBoolean(null)).to.equal(false);
    expect(p.isBoolean(10)).to.equal(false);
  }

  @test public null() {
    expect(p.isNull(null)).to.equal(true);
    expect(p.isNull(10)).to.equal(false);
  }

  @test public undefined() {
    const foo: { bar?: string } = {};
    expect(p.isUndefined(undefined)).to.equal(true);
    expect(p.isUndefined(foo.bar)).to.equal(true);
    expect(p.isUndefined(10)).to.equal(false);
  }

  @test public optional() {
    const isOptionalString = p.isOptional(p.isString);
    expect(isOptionalString("foo")).to.equal(true);
    expect(isOptionalString("")).to.equal(true);
    expect(isOptionalString(undefined)).to.equal(true);
    expect(isOptionalString(null)).to.equal(false);
    expect(isOptionalString(10)).to.equal(false);
    expect(isOptionalString(0)).to.equal(false);
  }

  @test public nullable() {
    const isNullableString = p.isNullable(p.isString);
    expect(isNullableString("foo")).to.equal(true);
    expect(isNullableString("")).to.equal(true);
    expect(isNullableString(undefined)).to.equal(false);
    expect(isNullableString(null)).to.equal(true);
    expect(isNullableString(10)).to.equal(false);
    expect(isNullableString(0)).to.equal(false);
  }

  @test public missing() {
    const isMissingString = p.isMissing(p.isString);
    expect(isMissingString("foo")).to.equal(true);
    expect(isMissingString("")).to.equal(true);
    expect(isMissingString(undefined)).to.equal(true);
    expect(isMissingString(null)).to.equal(true);
    expect(isMissingString(0)).to.equal(false);
    expect(isMissingString(10)).to.equal(false);
  }

  @test public singletonString() {
    const isHello = p.isSingletonString("Hello");
    expect(isHello("Hello")).to.equal(true);
    expect(isHello("foo")).to.equal(false);
  }

  @test public singletonNumber() {
    const isTen = p.isSingletonNumber(10);
    expect(isTen(10)).to.equal(true);
    expect(isTen(50)).to.equal(false);
    expect(isTen("Hello")).to.equal(false);
  }

  @test public array() {
    const isNumberArray = p.isArray(p.isNumber);

    expect(isNumberArray([])).to.equal(true);
    expect(isNumberArray([1, 2, 3])).to.equal(true);
    expect(isNumberArray([1, 2, "foo"])).to.equal(false);
    expect(isNumberArray({})).to.equal(false);
  }

  @test public object() {
    expect(p.isObject({ foo: "bar" })).to.equal(true);
    expect(p.isObject([])).to.equal(false);
    expect(p.isObject(null)).to.equal(false);
    expect(p.isObject("hello")).to.equal(false);
  }
}
