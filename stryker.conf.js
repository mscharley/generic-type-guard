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
    mutator: "typescript",
    transpilers: ["typescript"],
    tsconfigFile: "./tsconfig.json",
    reporter: ["clear-text", "html", "progress"],
    testFramework: "mocha",
    thresholds: { high: 100, low: 100, break: 100 },
    coverageAnalysis: "off"
  });
};
