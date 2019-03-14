import chalk from "chalk";
import * as td from "testdouble";
import { Container } from "typedi";
import { ConfigurationService } from "./ConfigurationService";
import { main } from "./main";

// tslint:disable:no-unsafe-any
// tslint:disable:no-void-expression

/**
 * Specs for the CLI file.
 */
describe("Cli", function(this: Mocha.Suite) {
  this.slow(50).timeout(300);

  beforeEach(() => {
    Container.reset();
    Container.set(ConfigurationService, {
      name: "world",
    });
  });

  afterEach(() => {
    td.reset();
  });

  it("testMain", () => {
    const log = td.function<(...msg: any[]) => void>();
    main([], log);
    td.verify(log(chalk.red("Hello world!"), []));
  });
});
