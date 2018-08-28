import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as g from "./guards";

/**
 * Compilation tests for the guard types.
 */
@suite(timeout(3000), slow(5))
export class GuardsSpec {
  @test public strToConstantType() {
    const fn: g.PartialTypeGuard<string, "Hello"> =
      (s): s is "Hello" => s === "Hello";

    expect(fn("Hello")).to.equal(true);
    expect(fn("Bye")).to.equal(false);
  }

  @test public typeGuardsArePartialGuards() {
    const fn: g.TypeGuard<"Hello"> =
      (s): s is "Hello" => typeof s === "string" && s === "Hello";
    const fn2: g.PartialTypeGuard<unknown, "Hello"> = fn;

    expect(fn2("Hello")).to.equal(true);
  }
}
