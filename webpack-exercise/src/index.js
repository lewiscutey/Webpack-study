import _ from 'lodash';
import printMe from './print'
import { cube } from './math'
// import * as webpackNumbers from 'webpack-numbers';
// var webpackNumbers = require('webpack-numbers');
require(['webpack-numbers'], function ( webpackNumbers) {
  // ...
  // AMD 模块调用
  console.log(1111111, webpackNumbers.wordToNum('two'));
  // ...
});

function component() {
  var element = document.createElement('pre');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['hello', ' webpack', cube(5)], '');

  btn.innerHTML = 'Click me';
  btn.onclick = printMe;

  element.appendChild(btn)

  return element;
}

document.body.appendChild(component())