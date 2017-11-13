import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import { FullDummyClass, LargeInterface } from "../dummy_classes.spec";
import { TypeGuard } from "../guards";
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
        .withProperty("n", p.isNull).get();
    expect(isSimpleInterface({ str: "foo", num: 10, b: false, n: null })).to.equal(true);
    expect(isSimpleInterface({ str: "foo", num: "foo", b: false, n: null })).to.equal(false);
    expect(isSimpleInterface(10)).to.equal(false);
  }

  @test public classImplementsInterface() {
    const isLargeInterface: TypeGuard<LargeInterface> =
      new IsInterface()
        .withProperty("foo", p.isString)
        .withProperty("bar", p.isNumber)
        .withProperty("active", p.isBoolean)
        .get();
    expect(isLargeInterface(new FullDummyClass())).to.equal(true);
  }

  @test public emptyInterface() {
    const isEmptyInterface: TypeGuard<{}> =
      new IsInterface().get();
    expect(isEmptyInterface({})).to.equal(true);
    expect(isEmptyInterface({ foo: "bar" })).to.equal(true);
    expect(isEmptyInterface(10)).to.equal(false);
  }
}
