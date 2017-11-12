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

  @test public singletonStringUnion() {
    const isGreeting = p.isSingletonStringUnion("hello", "こんにちは");
    expect(isGreeting("hello")).to.equal(true);
    expect(isGreeting("こんにちは")).to.equal(true);
    expect(isGreeting("foo")).to.equal(false);
    expect(isGreeting(5)).to.equal(false);
  }

  @test public singletonNumber() {
    const isTen = p.isSingletonNumber(10);
    expect(isTen(10)).to.equal(true);
    expect(isTen(50)).to.equal(false);
    expect(isTen("Hello")).to.equal(false);
  }

  @test public singletonNumberUnion() {
    const isTeen = p.isSingletonNumberUnion(13, 14, 15, 16, 17, 18, 19);
    expect(isTeen(14)).to.equal(true);
    expect(isTeen(20)).to.equal(false);
    expect(isTeen("hello")).to.equal(false);
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
    expect(p.isObject(undefined)).to.equal(false);
    expect(p.isObject("hello")).to.equal(false);
  }

  @test public set() {
    expect(p.isSet(null)).to.equal(false);
    expect(p.isSet(undefined)).to.equal(false);
    expect(p.isSet(42)).to.equal(true);
    expect(p.isSet(true)).to.equal(true);
    expect(p.isSet(false)).to.equal(true);
    expect(p.isSet("foo")).to.equal(true);
    expect(p.isSet([])).to.equal(true);
    expect(p.isSet({})).to.equal(true);
  }

  @test public any() {
    expect(p.isAny(true)).to.equal(true);
    expect(p.isAny("")).to.equal(true);
    expect(p.isAny(50)).to.equal(true);
    expect(p.isAny(null)).to.equal(true);
    expect(p.isAny(undefined)).to.equal(true);
    expect(p.isAny([])).to.equal(true);
    expect(p.isAny({})).to.equal(true);
  }
}
