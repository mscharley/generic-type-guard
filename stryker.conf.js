module.exports = function(config) {
  config.set({
    files: [
      {
        pattern: "src/**/*.ts",
        mutated: true,
        transpiled: true,
        included: false
      },
      "tests/**/*.ts"
    ],
    testRunner: "mocha",
    mutator: "typescript",
    transpilers: ["typescript"],
    tsconfigFile: "tsconfig.json",
    reporter: ["clear-text", "progress"],
    testFramework: "mocha",
    coverageAnalysis: "off"
  });
};
