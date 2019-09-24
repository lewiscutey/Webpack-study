const EventEmitter = require('events');
const myEmitter = new EventEmitter();
//on的第一个参数是事件名，之后emit可以通过这个事件名，从而触发这个方法。
//on的第二个参数是回掉函数，也就是此事件的执行方法
myEmitter.on('newListener', (param1,param2,param3) => {
	console.log("newListener111",param1,param2,param3)
});
//emit的第一个参数是触发的事件名
//emit的第二个以后的参数是回调函数的参数。
myEmitter.emit('newListener',111,222);