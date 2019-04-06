const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
var pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
var phaser = path.join(pathToPhaser, "dist/phaser.js");
require("dotenv").config();

const { ENVIRONMENT, PORT } = process.env;

module.exports = {
  mode: ENVIRONMENT,
  watch: true,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      phaser: phaser,
    },
  },
  devtool: "inline-source-map",
  target: "web",
  entry: "./src/client/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/",
  },
  devServer: {
    contentBase: "src/",
    watchContentBase: true,
    compress: true,
    port: PORT,
    host: "0.0.0.0",
    open: true, // If you don't like the browser to open automatically turn this off.
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/public/index.html" }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        // Include ts, tsx, and js files.
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(css)|(scss)$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      { test: /phaser\.js$/, loader: "expose-loader?Phaser" },
    ],
  },
};
