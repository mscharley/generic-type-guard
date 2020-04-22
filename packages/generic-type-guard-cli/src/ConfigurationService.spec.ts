
import * as path from "path";
import * as td from "testdouble";
import Container, { ContainerInstance } from "typedi";
import { ConfigurationService } from "./ConfigurationService";
import { expect } from "chai";
import { FileLoader } from "./utils/FileLoader";

/* eslint-disable no-magic-numbers */

/**
 * Specs for the configuration service.
 */
describe("ConfigurationService", function(this: Mocha.Suite) {
  this.slow(50).timeout(300);

  const loader = td.object<FileLoader>("loader");
  let container: ContainerInstance;

  beforeEach(() => {
    container = Container.of(this);
    container.reset();
    container.set(FileLoader, loader);
  });

  afterEach(() => {
    td.reset();
  });

  it("should load name from file", () => {
    td.when(loader.load(path.resolve(process.cwd(), "gtg-cli"))).thenReturn({
      name: "Matthew",
    });

    const config = container.get(ConfigurationService);
    expect(config.name).to.equal("Matthew");
  });

  it("should ignore invalid files", () => {
    td.when(loader.load(path.resolve(process.cwd(), "gtg-cli"))).thenReturn({
      name: 10,
    });

    const config = container.get(ConfigurationService);
    expect(config.name).to.equal("Unknown");
  });

  it("should provide a fallback name if not in file", () => {
    td.when(loader.load(path.resolve(process.cwd(), "gtg-cli"))).thenReturn({});

    const config = container.get(ConfigurationService);
    expect(config.name).to.equal("Unknown");
  });

  it("should provide a fallback name if there is an error loading the file", () => {
    td.when(loader.load(path.resolve(process.cwd(), "gtg-cli"))).thenThrow(new Error());

    const config = container.get(ConfigurationService);
    expect(config.name).to.equal("Unknown");
  });
});
