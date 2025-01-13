module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "jsdom", // For testing React components (use jsdom as the environment)
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // If you're using CSS modules
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transpile .ts and .tsx files
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect", // Setup for jest-dom matchers
  ],
};
