import { Service } from "typedi";

/**
 * FileLoader is an injectable wrapper around Node's require function for testing.
 */
@Service()
export class FileLoader {
  /* istanbul ignore next */
  public load(path: string): unknown {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    return require(path) as unknown;
  }
}
