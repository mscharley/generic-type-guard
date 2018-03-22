
import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as path from "path";
import * as td from "testdouble";
import Container, { ContainerInstance } from "typedi";
import { ConfigurationService } from "./ConfigurationService";
import { FileLoader } from "./utils/FileLoader";

// tslint:disable:no-unsafe-any
// tslint:disable:no-void-expression

/**
 * Specs for the configuration service.
 */
@suite(slow(50), timeout(300))
export class ConfigurationServiceSpec {
  protected container!: ContainerInstance;
  protected loader = td.object<FileLoader>("loader");

  public before() {
    this.container = Container.of(this);
    this.container.reset();
    this.container.set(FileLoader, this.loader);
  }

  public after() {
    td.reset();
  }

  @test("should load name from file")
  public testSuccess() {
    td.when(this.loader.load(path.resolve(process.cwd(), "gtg-cli"))).thenReturn({
      name: "Matthew",
    });

    const config = this.container.get<ConfigurationService>(ConfigurationService);
    expect(config.name).to.equal("Matthew");
  }

  @test("should provide a fallback name if not in file")
  public testFallback() {
    td.when(this.loader.load(path.resolve(process.cwd(), "gtg-cli"))).thenReturn({});

    const config = this.container.get<ConfigurationService>(ConfigurationService);
    expect(config.name).to.equal("Unknown");
  }

  @test("should provide a fallback name if there is an error loading the file")
  public testError() {
    td.when(this.loader.load(path.resolve(process.cwd(), "gtg-cli"))).thenThrow(new Error());

    const config = this.container.get<ConfigurationService>(ConfigurationService);
    expect(config.name).to.equal("Unknown");
  }
}
