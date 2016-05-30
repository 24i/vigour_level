'use strict'

var stamp = require('vigour-stamp')

exports.generate = function keyGeneration (stamp, path, timeStamp) {
  return stamp + '.' + path
}

function splitString (string, char) {
  for (let i = 1, len = string.length - 1; i < len; i++) {
    if (string.charAt(i) === char) {
      return [string.slice(0, i), string.slice(i + 1)]
    }
  }
}

exports.parse = function keyParse (eventKey) {
  var splitEventPath = splitString(eventKey, '.')
  return {
    event: splitEventPath[0],
    path: splitEventPath[1],
    stamp: stamp.parse(splitEventPath[0])
  }
}
