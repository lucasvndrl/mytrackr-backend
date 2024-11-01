import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/*.test.ts"],
  transformIgnorePatterns: ["/node_modules/", "node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/useCases/Account/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  // setupFilesAfterEnv: ["./src/tests/__setup__.ts"],
};

export default config;
