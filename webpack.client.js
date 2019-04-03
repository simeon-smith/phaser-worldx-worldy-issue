const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const commonConfig = require("./webpack.common");

module.exports = {
  ...commonConfig,
  target: "web",
  entry: "./src/client/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/",
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
    ],
  },
};
