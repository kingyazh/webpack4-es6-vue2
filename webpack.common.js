const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 根目录
const publicPath = process.env.ASSET_PATH || '/';

// 开发目录
const appPath = path.join(__dirname, 'src');

// 打包输出目录
const outputPath = path.join(__dirname, process.env.NODE_ENV === 'dev'?'dev':'dist');

const config = {
    // 入口文件
    entry: {
        main: './src/index.js',
        vendors: ['vue', 'vue-router','axios']
    },

    // 输出
    output: {
        path: outputPath,
        filename: '[name].bundle.js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: './',
        sourceMapFilename: 'map/[name].map',
    },

    resolve: {
        extensions: [
            '.ts', '.js', '.json','.css', '.scss','.vue'
        ],
        modules: [appPath, 'node_modules'],
        alias: {
            'vue$': path.resolve(__dirname,'./node_modules/vue/dist/vue.js'),
            'vue-router$':path.resolve(__dirname,'./node_modules/vue-router/dist/vue-router.js'),
            'convex$':path.resolve(__dirname,'./src/javascripts/lib/convex.js'),
        }
    },

    module: {
        rules: [
            // translate vue files
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            // es6 to es5
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    // exclude: /node_modules/
                },
            },
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                        },
                    },
                ],
            },
            // images chunk
            {
                test: /\.(jpg|png|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[hash:7].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
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
                            outputPath: './css/fonts/', // where the fonts will go
                            publicPath: './fonts/', // override the default path, css 中引用字体文件的相对路径
                        },
                    },
                ],
            },
            // json data chunk
            {
                test: /\.(json)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[ext]?[hash:7]',
                            outputPath: './data/'
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        // 每次打包清空目录
        new CleanWebpackPlugin(['./dist','./dev']),
        // 引入全局vue
        new webpack.ProvidePlugin({
            Vue: 'vue',
            $V: 'vue',
            axios:'axios'
        }),
        // 合并公共资源
        // CommonsChunkPlugin 被删除，用 SplitChunksPlugin 替换
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['polyfills', 'vendor'].reverse(),
        // }),

        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }),
        // 拷贝index.html并自动添加js引用，之后分别拆分到 开发 和 生产配置文件中
        new HtmlWebpackPlugin({ template: './src/index.html', chunksSortMode: 'dependency' }),//vue 更改为 app.vue
        // 自动添加css样式表到head标签中，并重命名为style.css
        new ExtractTextPlugin('css/[name].css'),

        // DefinePlugin 在 webpack4 下弃用
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // }),

        // webpack4 中 压缩插件写法已经不一样了，换成了 optimization 在 prod 环境中，如下写法会报错
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
}

// 获得模板文件 此处暂时不用
let pages = Object.keys(getEntry('src/views/**/*.html', 'src/views/'));
pages.forEach(function (pathname) {
    var conf = {
        filename: './views/' + pathname + '.html', // 生成的html存放路径，相对于path
        template: 'src/views/' + pathname + '.html', // html模板路径
        inject: false // js插入的位置，true/'head'/'body'/false
    }
    config.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = config;


// 获得模板文件 此处暂时不用
function getEntry(globPath, pathDir) {
    const files = glob.sync(globPath)
    let entries = {}, entry, dirname, basename, pathname, extname

    for (var i = 0; i < files.length; i++) {
        entry = files[i]
        dirname = path.dirname(entry)
        extname = path.extname(entry)
        basename = path.basename(entry, extname)
        pathname = path.normalize(path.join(dirname, basename))
        pathDir = path.normalize(pathDir)
        if (pathname.startsWith(pathDir)) {
            pathname = pathname.substring(pathDir.length)
        }
        entries[pathname] = ['./' + entry]
    }
    return entries
}