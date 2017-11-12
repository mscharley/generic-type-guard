module.exports = function(config) {
  config.set({
    files: [
      {
        pattern: "src/**/*.ts",
        mutated: true,
        included: false
      },
      "test/**/*.ts"
    ],
    testRunner: "mocha",
    mutator: "typescript",
    transpilers: ["typescript"],
    reporter: ["clear-text", "progress"],
    testFramework: "mocha",
    coverageAnalysis: "perTest"
  });
};
