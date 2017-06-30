const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: [
      path.resolve(__dirname, '../src/index.js'),
      // 'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8888'
    ],
    vendor: 'moment'
  },
  output: {
    filename: '[name].[chunkhash].js',  // 允许根据文件内容生成哈希值，要注意的是不要在开发环境下使用 chunkhash ,这样会增加编译时间
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=[path][name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wellcom webpack',
      template: path.resolve(__dirname, '../index.html'),
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: true,
      compress: true,
      comments: false
      // // 通过设置devtool options可以生成Source Maps
      // sourceMap: webpack.options.devtool && 
      //           (webpack.options.devtool.indexOf("sourcemap") >= 0 || 
      //             webpack.options.devtool.indexOf("source-map") >= 0),
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}