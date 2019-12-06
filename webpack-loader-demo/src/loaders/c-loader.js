module.exports = function() {
  console.log(`c`);
  return;
}

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  data.value = 42
  console.log(`c-pitch`)
}