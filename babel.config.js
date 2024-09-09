module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv", // Add dotenv plugin for environment variables
        {
          moduleName: "@env", // Alias for importing environment variables
          path: ".env", // Specify path to your .env file
        },
      ],
    ],
  };
};
