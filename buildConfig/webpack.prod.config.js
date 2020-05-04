const rootPath = require("./rootPath");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var TerserPlugin = require("terser-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  alias: baseAliasConfig,
  loaders: baseLoadersConfig,
} = require("./base.config");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode: "production",
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.join(rootPath, "/dist"),
    filename: "[name]-[contenthash:6].js",
    chunkFilename: "[name]-[contenthash:6].bundle.js",
  },
  resolve: {
    alias: {
      ...baseAliasConfig,
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
  },
  module: {
    rules: [
      { test: /\.js|jsx$/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, baseLoadersConfig.cssLoader],
      },
      baseLoadersConfig.fileLoader,
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(rootPath, "/src/index.ejs"),
      minify: false,
    }),
  ],
});
