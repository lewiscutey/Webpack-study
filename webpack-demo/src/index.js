import _ from 'lodash';
import printMe from './print';
// import './style.css';  // 通过`import`引入 CSS 文件
// import Icon from './icon.jpg'; // Icon 是图片的 URL
// import data from './data.json'; //  json数据

function component() { 
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], '');
    // element.classList.add('.hello');  // 在相应元素上添加类名
    // const myIcon = new Image();
    // myIcon.src = Icon;
    // element.appendChild(myIcon);
    // console.log(data);
    const btn = document.createElement('button');
    btn.innerHTML = "click me show content";
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());

if(module.hot) { 
// 习惯上我们会检查是否可以访问 `module.hot` 属性
  module.hot.accept('./print.js', function() { 
// 接受给定依赖模块的更新，并触发一个回调函数来对这些更新做出响应
    console.log('Accepting the updated printMe module!');
    // printMe();
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}