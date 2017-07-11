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
    // vendor: 'moment'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build')
  },
  module: {
    rules: [
      {
        /*
        使用babel编译ES6/ES7/ES8为ES5代码
        使用正则表达式匹配后缀名为.js的文件
        */
        test: /\.js$/,

        // 排除node_modules目录下的文件, npm安装的包不需要编译
        exclude: /node_modules/,

        /*
        use指定该文件的loader, 值可以是字符串或者数组.
        这里先使用eslint-loader处理, 返回的结果交给babel-loader处理. loader的处理顺序是从最后一个到第一个.
        eslint-loader用来检查代码, 如果有错误, 编译的时候会报错.
        babel-loader用来编译js文件.
        */
        use: ['babel-loader', 'eslint-loader']
      },
      {
        // 匹配.css文件
        test: /\.css$/,
        /*
        先使用css-loader处理, 返回的结果交给style-loader处理.
        css-loader将css内容存为js字符串, 并且会把background, @font-face等引用的图片,
        字体文件交给指定的loader打包, 类似上面的html-loader, 用什么loader同样在loaders对象中定义.
        */
        use: ['style-loader', 'css-loader']

        // use: ExtractTextPlugin.extract({
        //   use: 'css-loader'
        // })
      },
      {
        // 匹配.html文件
        test: /\.html$/,
        /*
        使用html-loader, 将html内容存为js字符串, 比如当遇到
        import htmlString from './template.html'
        template.html的文件内容会被转成一个js字符串, 合并到js文件里.
        */
        use: 'html-loader'
      },
      {
        /*
        匹配各种格式的图片和字体文件
        上面html-loader会把html中<img>标签的图片解析出来, 文件名匹配到这里的test的正则表达式,
        css-loader引用的图片和字体同样会匹配到这里的test条件
        */
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,

        /*
        使用url-loader, 它接受一个limit参数, 单位为字节(byte)

        当文件体积小于limit时, url-loader把文件转为Data URI的格式内联到引用的地方
        当文件大于limit时, url-loader会调用file-loader, 把文件储存到输出目录, 并把引用的文件路径改写成输出后的路径

        比如 views/foo/index.html中
        <img src="smallpic.png">
        会被编译成
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA...">

        而
        <img src="largepic.png">
        会被编译成
        <img src="/f78661bef717cf2cc2c2e5158f196384.png">
        */
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  /*
  配置webpack插件
  plugin和loader的区别是, loader是在import时根据不同的文件名, 匹配不同的loader对这个文件做处理,
  而plugin, 关注的不是文件的格式, 而是在编译的各个阶段, 会触发不同的事件, 让你可以干预每个编译阶段.
  */
  plugins: [
    /*
    html-webpack-plugin用来打包入口html文件
    entry配置的入口是js文件, webpack以js文件为入口, 遇到import, 用配置的loader加载引入文件
    但作为浏览器打开的入口html, 是引用入口js的文件, 它在整个编译过程的外面,
    所以, 我们需要html-webpack-plugin来打包作为入口的html文件
    */
    new HtmlWebpackPlugin({
      title: 'Wellcom webpack',
      /*
      template参数指定入口html文件路径, 插件会把这个文件交给webpack去编译,
      webpack按照正常流程, 找到loaders中test条件匹配的loader来编译, 那么这里html-loader就是匹配的loader
      html-loader编译后产生的字符串, 会由html-webpack-plugin储存为html文件到输出目录, 默认文件名为index.html
      可以通过filename参数指定输出的文件名
      html-webpack-plugin也可以不指定template参数, 它会使用默认的html模板.
      */
      template: path.resolve(__dirname, '../src/index.html'),
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

  /*
  配置开发时用的服务器, 让你可以用 http://127.0.0.1:8080/ 这样的url打开页面来调试
  并且带有热更新的功能, 打代码时保存一下文件, 浏览器会自动刷新. 比nginx方便很多
  如果是修改css, 甚至不需要刷新页面, 直接生效. 这让像弹框这种需要点击交互后才会出来的东西调试起来方便很多.
  */
  devServer: {
    /*
    historyApiFallback用来配置页面的重定向

    SPA的入口是一个统一的html文件, 比如
    http://localhost:8010/foo
    我们要返回给它
    http://localhost:8010/index.html
    这个文件

    配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
    */
    historyApiFallback: true,
    // 告诉 dev-server 在使用HMR
    hot: true,
    contentBase: path.resolve(__dirname, '../build'),
    publicPath: '/',
    port: PORT,
  }
}