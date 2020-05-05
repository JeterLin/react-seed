const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const rootPath = require("./rootPath");
const {
  alias: baseAliasConfig,
  loaders: baseLoadersConfig,
  entry: entryConfig,
  extensions: extensionsConfig,
} = require("./base.config");

const cacheId = "0.0.1-" + String(Math.random() * 1e6).slice(0, 6);
module.exports = smp.wrap({
  mode: "development",
  entry: entryConfig,
  output: {
    path: path.join(rootPath, "/dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/assets/",
  },
  resolve: {
    alias: {
      ...baseAliasConfig,
    },
    extensions: extensionsConfig,
  },
  // use for load on demand
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          test: /\.jsx?$/,
          name: "vendors",
          chunks: "all",
          minChunks: 2,
          minSize: 30000,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)|(css)$/,
        loader: "cache-loader",
        //  每次启动webpack进入dev模式的构建，都清空上一次缓存的编译结果
        options: { cacheIdentifier: cacheId },
      },
      { test: /\.(ts|js)x?$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      baseLoadersConfig.fileLoader,
    ],
  },
  devtool: "source-map",
  devServer: {
    port: 8081,
    contentBase: path.join(rootPath, "/src"),
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    compress: true,
  },
});
