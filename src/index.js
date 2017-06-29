/*
 * @Author: Ping Qixing
 * @Date: 2017-06-28 15:20:50
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-29 09:14:16
 * @Description
 */
import _ from 'lodash';
import './style.css';
import Icon from './icon.svg'
import Library from './library'

// 测试 HMR
if (module.hot) {
  module.hot.accept('./library', () => {
    console.log('Accepting the updated module!');
    Library.log();
  })
}

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