const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const rootPath = require("./rootPath");

const cacheId = "0.0.1-" + String(Math.random() * 1e6).slice(0, 6);
module.exports = smp.wrap({
  mode: "development",
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.join(rootPath, "/dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/assets/",
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          test: /\.jsx?$/,
          name: "vendors",
          chunks: "initial",
          minChunks: 1,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)|(css)$/,
        loader: "cache-loader",
        options: { cacheIdentifier: cacheId },
      },
      { test: /\.js|jsx$/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true },
          },
        ],
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    port: 8081,
    contentBase: path.join(rootPath, "/src"),
    hot: true,
    inline: true,
    open: true,
    compress: true,
  },
});
