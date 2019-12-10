const loaderUtils = require('loader-utils')

module.exports = function(source) {
  console.log(`a`);
  const options = loaderUtils.getOptions(this);
  console.log(`options`, options)
  return `export default ${ JSON.stringify(source) }`;
}
// module.exports.pitch = function(remainingRequest, precedingRequest, data) {
//   console.log(`a-pitch`)
// }