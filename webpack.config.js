const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const JSDocWebpackPlugin = require("jsdoc-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/client/js/views/index.js",
    dashboard: "./src/client/js/views/dashboard.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new JSDocWebpackPlugin({
      conf: "jsdoc.json",
    }),
  ],
};