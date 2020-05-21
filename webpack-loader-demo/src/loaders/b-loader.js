module.exports = function() {
  console.log(`1222`, this.loaders)
  console.log(`b`);
  return;
}

// module.exports.pitch = function(remainingRequest, precedingRequest, data) {
//   console.log(`b-pitch`)
//   return JSON.stringify(remainingRequest);
// }