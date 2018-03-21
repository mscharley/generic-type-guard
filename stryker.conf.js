module.exports = function(config) {
  config.set({
    files: [
      '!src/**/*.ts',
      {
        pattern: "src/**/*.ts",
        mutated: true,
        included: false
      },
      '!src/**/*.spec.ts',
      {
        pattern: "src/**/*.spec.ts",
        mutated: false,
        included: true
      }
    ],
    testRunner: "mocha",
    testFramework: "mocha",
    mochaOptions: {
      opts: "../../mocha.opts",
    },
    mutator: "typescript",
    transpilers: ["typescript"],
    tsconfigFile: "./tsconfig.json",
    reporter: ["clear-text", "html", "progress"],
    thresholds: { high: 100, low: 99, break: 95 },
    coverageAnalysis: "off"
  });
};
