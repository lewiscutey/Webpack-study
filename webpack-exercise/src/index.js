import _ from 'lodash';
import printMe from './print'

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['hello', ' webpack'], '');

  btn.innerHTML = 'Click me';
  btn.onclick = printMe;

  element.appendChild(btn)

  return element;
}

document.body.appendChild(component())