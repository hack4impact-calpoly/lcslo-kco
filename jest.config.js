module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "jest-environment-jsdom", //use jsdom as the environment)
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // If you're using CSS modules
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transpile .ts and .tsx files
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
