module.exports = function(config) {
  config.set({
    files: [
      'mocha.opts',
      'src/**/*.ts',
    ],
    mutate: [
      'src/**/*.ts',
      '!src/**/*.spec.ts',
    ],
    testRunner: "mocha",
    testFramework: "mocha",
    mochaOptions: {
      files: [
        'dist/**/*.spec.js',
      ],
      opts: "./mocha.opts",
    },
    mutator: "typescript",
    transpilers: ["typescript"],
    tsconfigFile: "./tsconfig.json",
    reporters: ["clear-text", "html", "progress"],
    thresholds: { high: 100, low: 99, break: 80 },
    coverageAnalysis: "off"
  });
};
