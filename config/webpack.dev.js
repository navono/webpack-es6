const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PORT = 8888;

module.exports = {
  // 因为webpack输出的bundle文件，当JavaScript抛出异常时，我们需要知道错误发生在哪个文件的哪一行
  devtool: "cheap-eval-source-map",
  // 如果从Sources 面板保存时设置 Chrome 以保持更改 则无需刷新页面，你将不得不设置 webpack 来使用
  // devtool: "inline-source-map",
  // 继续编辑和保存来自Chrome或源文件的更改。

  entry: {
    index: [
      path.resolve(__dirname, '../src/index.js'),
      // 'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8888'
    ],
    vendor: 'moment'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
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
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico')
    }),
    // 启用 HMR
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css'),

    // 还有一种隐式公共 vendor chunk 的配置方法，参照官方的文档 Guide - 代码分离 库
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest' ]  // 指定公共 bundle 的名字
    }),
    new OpenBrowserPlugin({
      url: `http:\\localhost:${PORT}`
    })

    // 将 production的配置分离到独立的配置文件中
    // new webpack.optimize.UglifyJsPlugin({
    //   // 通过设置devtool options可以生成Source Maps
    //   sourceMap: options.devtool && 
    //             (options.devtool.indexOf("sourcemap") >= 0 || 
    //               options.devtool.indexOf("source-map") >= 0),
    //   compress: process.env.NODE_DEV === 'production'
    // }),

    // // DefinePlugin 在原始的源码中执行查找和替换操作，在导入的代码中，
    // // 任何出现 process.env.NODE_ENV的地方都会通过UglifyJS被替换为"production"
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ],

  // 别名，还有一个 ProvidePlugin 插件可以实现按需的全局变量名称依赖
  // https://doc.webpack-china.org/guides/shimming/
  // resolve: {
  //   alias: {
  //   }
  // },

  devServer: {
    historyApiFallback: true,
    // 告诉 dev-server 在使用HMR
    hot: true,
    contentBase: path.resolve(__dirname, '../build'),
    publicPath: '/',
    port: PORT,
  }
}