const { SyncHook } = require('tapable')
let h1 = new SyncHook(['options']);
h1.tap('A', function (arg) {
  console.log('A', arg);
  return 'b';
})
h1.tap('B', function () {
  console.log('b')
})
h1.intercept({
  call: (...args) => {
    console.log(...args, '-----intercept call');
  },
  register: (tap) => {
    console.log(tap, '-----intercept register');
    return tap;
  },
  loop: (...args) => {
    console.log(...args, '------intercept loop')
  },
  tap: (tap) => {
    console.log(tap, '------intercept tap')
  }
})
// h1.call(666);