'use strict'

module.exports = function allIsDone (check, callback) {
  var keys = Object.keys(check)
  var allDone = true
  for (var i = 0, max = keys.length; i < max; i++) {
    if (check[keys[i]] === false) {
      allDone = false
    }
  }
  if (allDone && callback) {
    callback()
  }
}
