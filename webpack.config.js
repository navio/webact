var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (function (config) {
    return {

        devtool: 'source-map',

        entry: {
            index: config.src + "/js/app"
        },

        devServer: {
            inline: true,
            contentBase: "dist",
            host: 'localhost',
            https: true,
            port: '9000',
            historyApiFallback:true
        },

        module: {
            rules: [
            { exclude: /(node_modules|vendors)/, test: /\.(jsx|js)$/, loader: "babel-loader" },
            { test: /\.js$/, enforce: "pre", loader: "source-map-loader" },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ["css-loader","sassjs-loader"]
              })
            },
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ["css-loader"]
              })
            }
            ]
        },

        output: {
            path: config.dist,
            filename: 'js/[name].js',
            publicPath:'/'
        },

        context: __dirname,
        
        node: {
            __dirname: true
        },
        resolve: {
             modules:['node_modules'],
             extensions: [".js",".jsx"]
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
                title: 'RenderMe',
                filename: 'index.html',
                template: config.src + '/template.html',
                minify: {
                    html5: true,
                    removeComments: true,
                    useShortDoctype: true,
                    removeTagWhitespace: true,
                    removeStyleLinkTypeAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeRedundantAttributes: true,
                    removeOptionalTags: true,
                    processConditionalComments: true,
                    minifyCSS: true,
                    minifyJS: true,
                    keepClosingSlash: true,
                    collapseWhitespace: true
                },
                hash: true
            }),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                warnings: false
                }
            })
            
        ]

    }
}({
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
  ENV: "DEV"
}));