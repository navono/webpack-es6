/*
 * @Author: Ping Qixing
 * @Date: 2017-06-29 10:37:14
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-29 13:20:30
 * @Description
 * 这个文件展示如何使用 Tree Shaking 技术
 */

// 这个函数没有被其他地方引用过
export function square(x) {
  return x * x;
}

// 这个函数被引用了
export function cube(x) {
  return x * x * x;
}