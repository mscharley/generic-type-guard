import * as path from "path";
import { Inject, Service } from "typedi";
import { FileLoader } from "./utils/FileLoader";

@Service()
export class ConfigurationService {
  private config: { [name: string]: string };

  constructor(
    @Inject(() => FileLoader) loader: FileLoader,
  ) {
    try {
      const configPath = path.resolve(process.cwd(), "gtg-cli");
      this.config = loader.load(configPath);
    }
    catch (e) {
      this.config = {};
    }
  }

  public get name(): string {
    return this.config.name != null ? this.config.name : "Unknown";
  }
}
