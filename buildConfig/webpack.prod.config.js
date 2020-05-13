const rootPath = require('./rootPath');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { alias: baseAliasConfig, loaders: baseLoadersConfig, entry: entryConfig, extensions: extensionsConfig } = require('./base.config');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
    mode: 'production',
    entry: entryConfig,
    output: {
        path: path.join(rootPath, '/dist'),
        filename: '[name]-[contenthash:6].js',
        chunkFilename: '[name]-[contenthash:6].bundle.js',
    },
    resolve: {
        alias: {
            ...baseAliasConfig,
        },
        extensions: extensionsConfig,
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
        splitChunks: {
            name: true,
            cacheGroups: {
                commons: {
                    test: /src\/.*\.(tsx?|jsx?)$/,
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                    minSize: 30000,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            },
        },
    },
    module: {
        rules: [
            { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64:8]',
                            },
                        },
                    },
                    baseLoadersConfig.lessLoader,
                ],
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            baseLoadersConfig.fileLoader,
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(rootPath, '/src/index.ejs'),
            minify: false,
        }),
    ],
});
