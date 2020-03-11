// import './base.css'
// import './index.css'
import {add} from './main'
add()
import('./main').then(add => {
  console.log(add)
})

import('./c').then(del => del(1, 2))



export const aa = (option) => {
  // import('vue').then();
  return option;
}
console.log(`index`);