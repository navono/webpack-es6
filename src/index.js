/*
 * @Author: Ping Qixing
 * @Date: 2017-06-28 15:20:50
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-28 15:42:18
 * @Description
 */
import _ from 'lodash';
import './style.css';

function component() {
  let element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());