import { Service } from "typedi";

@Service()
export class FileLoader {
  /* istanbul ignore next */
  public load(path: string): any {
    return require(path);
  }
}
