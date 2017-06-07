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
运行

http-server
打开浏览器访问http://127.0.0.1:8080/,


在命令中输入：webpack -w，生成编译后的js文件。