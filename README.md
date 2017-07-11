Q: 这样子做的话，和html中直接引用源文件效果是一样的啊。话说为什么要编译啊？这样不是更麻烦吗？

A: 编译其实是为了实现模块化。基于AMD/CMD/CommonJS/es6的语法，浏览器是无法识别的。这些规范的语法，可以感受一下：

```js
 //AMD
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC)
{
    alert('加载成功');
});

//CMD
seajs.use("../static/hello/src/main")

//CommonJS
module.export = {
    name:'rouwan'
}

//es6模块
import {module1, module2} form './module.js';
```

npm install babel-core babel-loader babel-preset-es2015

为了便于调试，我们全局安装一个http-server,用于启动我们的项目。
安装http-server

npm install http-server -g
运行 http-server ./dist -o

打开浏览器访问[http://127.0.0.1:8080/,]


在命令中输入：webpack -w，生成编译后的js文件。

---

webapck-dev-server 使用内存编译
HMR 不适用于生产环境，这意味着它应当只在开发环境使用。
其他的loader包括：
react hot loader
vue loader
redux HMR

---

生产环境中使用webpack -p(也可以运行 webpack --optimize-minimize --define process.env.NODE_ENV="production"，他们是等效的)。会执行以下步骤：
- 使用UglifyJsPlugin进行JS文件压缩（此插件只支持ES5，因此需要借助babel）
- 运行LoaderOptionsPlugin
- 设置NodeJS环境变量，触发某些package包，以不同的方式进行编译


这是来自navonoTest的修改。