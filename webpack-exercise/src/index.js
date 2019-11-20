import _ from 'lodash';
import printMe from './print'
import { cube } from './math'

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