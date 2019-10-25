module.exports = function() {
  console.log(`b`);
  console.log(`data`, this.data)
  return;
}
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  data.value = 42
  console.log(`b-pitch`)
  return JSON.stringify(remainingRequest);
}