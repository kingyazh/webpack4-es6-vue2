const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');

const publicPath = process.env.ASSET_PATH || '/';
const API_ROOT = require('./api.path');

module.exports = Merge(CommonConfig, {
    mode:'development',
    // source map
    devtool: 'eval-source-map',
    module: {
        rules: [
            // css loader
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // 'css-loader?importLoaders=1', //对于css中@import进来的css同样做前缀处理
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders:1,
                            sourceMap: true
                        }
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
                    }
                ],
            },
            // scss to css
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders:1,
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
            },
            // font chunk
            {
                test: /\.(woff|woff2?|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 90000,
                            name: '[name].[ext]?[hash:7]',
                            outputPath: './fonts/',
                            publicPath: './fonts/',
                        },
                    },
                ],
            },
        ]
    },
    // dev server
    devServer: {
        port: 30008,
        host: 'localhost',
        hot: true,
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: publicPath,
        // 接口做代理，避免开发环境中接口涉及跨域
        proxy: {
            "rest/*": {
                target: "http://172.16.37.51:8080/visacloud/rest/",
                changeOrigin: true,
                pathRewrite: {"^/api" : ""}
            }
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: 'map/[name].js.map',
        }),
        new webpack.DefinePlugin({
            'process.env': API_ROOT
        }),
    ]
})
