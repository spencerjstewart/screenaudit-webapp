const path = require("path");
const JSDocWebpackPlugin = require("jsdoc-webpack-plugin");

module.exports = {
  entry: "./src/client/js/index.js", // Your main JavaScript file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new JSDocWebpackPlugin({
      conf: "jsdoc.json",
    }),
  ],
};
