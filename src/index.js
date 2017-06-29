/*
 * @Author: Ping Qixing
 * @Date: 2017-06-28 15:20:50
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-29 10:42:11
 * @Description
 */
import _ from 'lodash';
import './styles/style.css';
import Icon from './icon.svg'
import Library from './components/library'
import {cube} from './components/maths'   // 展示 Tree Shaking 技术，它依赖于 ES2015 模块系统中 import/export 的静态结构特性

// 测试 HMR
if (module.hot) {
  module.hot.accept('./components/library', () => {
    console.log('Accepting the updated module!');
    Library.log();
  })
}

console.log(cube(5));

function component() {
  let element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们现有的 div。
  let myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());