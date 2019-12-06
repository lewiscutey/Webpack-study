import { add } from "./b";
import Vue from 'vue'
add(1, 2)

import('./c').then(del => del(1, 2))

var vm = new Vue({
  // 选项
})