const JSDocWebpackPlugin = require("jsdoc-webpack-plugin");

module.exports = {
  plugins: [
    new JSDocWebpackPlugin({
      conf: "jsdoc.json",
    }),
  ],
};
