import chalk from "chalk";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as td from "testdouble";
import { main } from "./cli";

// tslint:disable:no-unsafe-any
// tslint:disable:no-void-expression

/**
 * Specs for the CLI file.
 */
@suite(slow(50), timeout(300))
export class CliSpec {
  public after() {
    td.reset();
  }

  @test public testMain() {
    const log = td.function<(...msg: any[]) => void>();
    main([], log);
    td.verify(log(chalk.red("Hello world!"), []));
  }
}
