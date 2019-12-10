module.exports = function() {
  console.log(`b`);
  return;
}

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  console.log(`b-pitch`)
  return JSON.stringify(remainingRequest);
}