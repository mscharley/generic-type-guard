import chalk from "chalk";

/**
 * This is the main entrypoint for the application.
 *
 * This is called from the JS/TS executable stub as quickly as possible.
 */
export const main = () => {
  // tslint:disable-next-line:no-console
  console.log(chalk.red("Hello world!"), process.argv);
};
