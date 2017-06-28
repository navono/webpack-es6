/*
 * @Author: Ping Qixing
 * @Date: 2017-06-28 15:20:50
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-28 15:58:16
 * @Description
 */
import _ from 'lodash';
import './style.css';
import Icon from './icon.svg'

function component() {
  let element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们现有的 div。
  let myIcon = new Image();

  console.log(myIcon);
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());