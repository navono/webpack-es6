const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 因为webpack输出的bundle文件，当JavaScript抛出异常时，我们需要知道错误发生在哪个文件的哪一行
  devtool: "cheap-eval-source-map",
  // 如果从Sources 面板保存时设置 Chrome 以保持更改 则无需刷新页面，你将不得不设置 webpack 来使用
  // devtool: "inline-source-map",
  // 继续编辑和保存来自Chrome或源文件的更改。

  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
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
      template: path.resolve(__dirname, './index.html'),
      favicon: path.resolve(__dirname, './src/favicon.ico')
    }),
    // 启用 HMR
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // 告诉 dev-server 在使用HMR
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}