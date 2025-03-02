module.exports = {
  preset: "ts-jest",
  preset: "@shelf/jest-mongodb", // Use ts-jest for TypeScript support
  testEnvironment: "jest-environment-jsdom", //use jsdom as the environment)
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // If you're using CSS modules
    "^@/styles/(.*)$": "identity-obj-proxy",
  },
  transform: {
    //"^.+\\.tsx?$": "ts-jest", // Transpile .ts and .tsx files
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use babel-jest to transpile JS/JSX/TS/TSX files
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
