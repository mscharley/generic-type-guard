import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import { FullDummyClass, LargeInterface } from "../dummy_classes.spec";
import { TypeGuard } from "../guards";
import * as o from "../objects";
import * as p from "../primitives";
import { IsInterface } from "./interface";

export interface SimpleInterface {
  str: string;
  num: number;
  b: boolean;
  n: null;
}

/**
 * Compilation tests for the IsInterface class.
 */
@suite(timeout(3000), slow(5))
export class InterfaceSpec {
  // This class is a wrapper around isUnion, most of the real tests happen there.
  @test public interface() {
    const isSimpleInterface: TypeGuard<SimpleInterface> =
      new IsInterface()
        .withProperty("str", p.isString)
        .withProperty("num", p.isNumber)
        .withProperty("b", p.isBoolean)
        .with(o.hasProperty("n", p.isNull)).get();
    expect(isSimpleInterface({ str: "foo", num: 10, b: false, n: null })).to.equal(true);
    expect(isSimpleInterface({ str: "foo", num: "foo", b: false, n: null })).to.equal(false);
    expect(isSimpleInterface(10)).to.equal(false);
  }

  @test public classImplementsInterface() {
    const isLargeInterface: TypeGuard<LargeInterface> =
      new IsInterface()
        .with(o.hasProperty("foo", p.isString))
        .withProperty("bar", p.isNumber)
        .withProperty("active", p.isBoolean)
        .get();
    expect(isLargeInterface(new FullDummyClass())).to.equal(true);
  }

  @test public stringIndex() {
    const isObject: TypeGuard<{ [prop: string]: number }> =
      new IsInterface().withStringIndexSignature(p.isNumber).get();
    const isLooseObject: TypeGuard<{ [prop: string]: number }> =
      new IsInterface().withStringIndexSignature(p.isNumber, false).get();
    expect(isObject({ one: 1, two: 2, three: 3 })).to.equal(true, "filled object");
    expect(isObject({})).to.equal(false, "strict empty object");
    expect(isLooseObject({})).to.equal(true, "loose empty object");
  }

  @test public numberIndex() {
    const isArrayLike: TypeGuard<{ [prop: number]: string }> =
      new IsInterface().withNumericIndexSignature(p.isString).get();
    const isLooseArrayLike: TypeGuard<{ [prop: number]: string }> =
      new IsInterface().withNumericIndexSignature(p.isString, false).get();
    expect(isArrayLike([ "one", "two", "three" ])).to.equal(true, "filled array");
    expect(isArrayLike([])).to.equal(false, "strict empty array");
    expect(isLooseArrayLike([])).to.equal(true, "loose empty array");
  }

  @test public emptyInterface() {
    const isEmptyInterface: TypeGuard<{}> =
      new IsInterface().get();
    expect(isEmptyInterface({})).to.equal(true);
    expect(isEmptyInterface({ foo: "bar" })).to.equal(true);
    expect(isEmptyInterface(10)).to.equal(false);
  }
}
