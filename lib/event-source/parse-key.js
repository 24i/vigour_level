'use strict'

module.exports = function esParseKey (key, split) {
  split = split || '|'
  var parse = ['', '']
  var cur = 0
  for (var i = 0, max = key.length; i < max; i++) {
    if (key.charAt(i) === split) {
      cur++
    } else {
      parse[cur] += key.charAt(i)
    }
  }
  return {
    scope: parse[0],
    key: parse[1]
  }
}
