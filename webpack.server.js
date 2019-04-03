const path = require("path");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");
const StartServerPlugin = require("start-server-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  ...commonConfig,
  target: "node",
  entry: ["webpack/hot/poll?1000", "./src/server/index.ts"],
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?1000"],
    }),
  ],
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new StartServerPlugin("server.js"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
