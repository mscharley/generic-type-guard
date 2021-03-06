import * as td from 'testdouble';
import chalk from 'chalk';
import { ConfigurationService } from './ConfigurationService';
import { Container } from 'typedi';
import { main } from './main';

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Specs for the CLI file.
 */
describe('Cli', function (this: Mocha.Suite) {
  this.slow(50).timeout(300);

  beforeEach(() => {
    Container.reset();
    Container.set(ConfigurationService, {
      name: 'world',
    });
  });

  afterEach(() => {
    td.reset();
  });

  it('testMain', () => {
    const log = td.function<(...msg: unknown[]) => void>();
    main([], log);
    td.verify(log(chalk.red('Hello world!'), []));
  });
});
