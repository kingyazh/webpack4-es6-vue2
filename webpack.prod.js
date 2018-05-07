const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const API_ROOT = require('./api.path');
module.exports = Merge(CommonConfig, {
    mode:'production',
    devtool: 'source-map',
    module: {
        rules: [
            // css loader
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "resolve-url-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        // 'css-loader?importLoaders=1', //对于css中@import进来的css同样做前缀处理
                    ],
                })
            },
            // scss to css
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "resolve-url-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }),
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': API_ROOT
        }),

    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
        ]
    }
})