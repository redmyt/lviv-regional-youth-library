const path = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

const src = path.join(__dirname, 'bibliotekanarynku9_ui/src/'),
      dist = path.join(__dirname, 'bibliotekanarynku9_ui/public/');

module.exports = {
    entry: src + 'app.js',
    output: {
        path: dist,
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: dist,
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
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
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
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: src + 'img',
                            name: '[path][name].[ext]',
                            outputPath: 'img'
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 75
                            },
                            pngquant: {
                                quality: '75',
                                speed: 4
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: src + 'fonts',
                            name: '[path][name].[ext]',
                            outputPath: 'fonts'
                        },
                    },
                ]
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
