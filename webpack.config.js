/*
 * @Author: Ping Qixing
 * @Date: 2017-06-07 15:25:54
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-21 14:11:16
 */

const path = require('path');
const webpack = require('webpack');

// CommonJS写法
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        // bundle: __dirname + '/src/file.js'
        app: './app.js',
    },
    output: {
        // path: __dirname + '/dist',
        // filename: '[name].js'
        
        path: path.resolve(__dirname, './dist/assets'),
        filename: '[name].bundle.js',
        publicPath: '/assets',
    },
    module: {
        // 大致意思是：所有的js文件，使用babel加载器来翻译一下
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presents=es2015'
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
    }
}