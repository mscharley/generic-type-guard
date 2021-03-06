import { Service } from 'typedi';

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * FileLoader is an injectable wrapper around Node's require function for testing.
 */
@Service()
export class FileLoader {
  /* istanbul ignore next */
  public load(path: string): unknown {
    return require(path) as unknown;
  }
}
