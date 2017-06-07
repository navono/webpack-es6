/*
 * @Author: Ping Qixing
 * @Date: 2017-06-07 15:25:54
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-07 16:10:18
 */

// CommonJS写法
module.exports = {
    entry: {
        bundle: __dirname + '/src/file.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        // 大致意思是：所有的js文件，使用babel加载器来翻译一下
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presents=es2015'
        }]
    }
}