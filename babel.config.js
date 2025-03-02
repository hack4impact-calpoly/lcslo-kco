module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react", // Adds support for JSX,
    "@babel/preset-typescript", // For TypeScript support (removes type checking)
  ],

  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"], // Root directory to start resolving
        alias: {
          "@": "./src", // Match the alias to your TypeScript configuration
        },
      },
    ],
  ],
};
