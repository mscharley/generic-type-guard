import 'reflect-metadata';
import chalk from 'chalk';
import { ConfigurationService } from './ConfigurationService';
import Container from 'typedi';

/**
 * This is the main entrypoint for the application.
 *
 * This is called from the JS/TS executable stub as quickly as possible.
 */
export const main = (
  args: string[],
  log: (msg: string, ...params: unknown[]) => void,
): void => {
  const config = Container.get<ConfigurationService>(ConfigurationService);
  log(chalk.red(`Hello ${config.name}!`), args);
};
