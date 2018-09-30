console.log('hello world');

import('./logger').then(logger => {
  logger();
});