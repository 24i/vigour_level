'use strict'

var stamp = require('vigour-stamp')
var utcTimeStamp = require('./utc-timestamp').current

exports.generate = function keyGeneration (stamp, path) {
  return utcTimeStamp() + '~' + stamp + '.' + path
}

function splitString (string, char) {
  for (let i = 1, len = string.length - 1; i < len; i++) {
    if (string.charAt(i) === char) {
      return [string.slice(0, i), string.slice(i + 1)]
    }
  }
}

exports.parse = function keyParse (eventKey) {
  var elements = splitString(eventKey, '~')
  var splitEventPath = splitString(elements[1], '.')
  return {
    timestamp: Number(elements[0]),
    event: splitEventPath[0],
    path: splitEventPath[1],
    stamp: stamp.parse(splitEventPath[0])
  }
}
