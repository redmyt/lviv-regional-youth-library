const path = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

const src = path.join(__dirname, 'bibliotekanarynku9_administration_panel/src/'),
      dest = path.join(__dirname, 'bibliotekanarynku9_administration_panel/public/');

module.exports = {
    entry: src + 'app.js',
    output: {
        path: dest,
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: dest,
        publicPath: '/',
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_compontents)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
        new HtmlWebpackPlugin({
            template: src + 'index.pug'
        }),
        new CleanWebpackPlugin(['public'])
    ]
};
