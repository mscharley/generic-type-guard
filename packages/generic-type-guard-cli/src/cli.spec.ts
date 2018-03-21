import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";

/**
 * Specs for the CLI file.
 */
@suite(slow(50), timeout(300))
export class CliSpec {
  @test()
  public test() {
    expect(true).to.equal(true);
  }
}
