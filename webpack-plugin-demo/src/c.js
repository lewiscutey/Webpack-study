import { mod } from "./d.js";
import Vue from 'vue'

mod(100, 11)

import('./b.js').then(add => add(1, 2));

export default function del(a, b) {
  return a - b
}

var vm = new Vue({
  // 选项
})