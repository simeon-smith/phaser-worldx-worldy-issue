const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
var phaser = path.join(pathToPhaser, "dist/phaser.js");
require("dotenv").config();

const { PORT } = process.env;

module.exports = (env, argv) => {
  const { mode } = argv;
  return {
    // watch: true,
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
      new MiniCssExtractPlugin({
        filename: "style.[hash].css",
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: "./src/public/index.html" }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new CopyPlugin([{ from: "src/public/fonts", to: "fonts" }]),
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
          test: /\.s[c|a]ss$/,
          use: [
            {
              loader: mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                config: {
                  ctx: {
                    mode: "development",
                  },
                },
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        { test: /phaser\.js$/, loader: "expose-loader?Phaser" },
      ],
    },
  };
};
