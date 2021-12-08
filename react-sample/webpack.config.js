const path = require('path');
const htmlWebpPlugin = require('html-webpack-plugin');
const ReactRefresWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const nodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new nodePolyfillWebpackPlugin(),
        new htmlWebpPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        isDevelopment && new ReactRefresWebpackPlugin()
    ].filter(Boolean),
    devServer: {
        static: path.resolve(__dirname, 'public', 'index.html')
    },
    resolve: {
        fallback: {
            "path": false,
            "os": false,
            "stream": false,
            "http": false,
            "https": false,
            "crypto": false,
            "buffer": false,
            "fs": false
        }
    }
}
