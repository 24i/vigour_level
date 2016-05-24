'use strict'

var stamp = require('vigour-stamp')
var utcTimeStamp = require('./utc-timestamp')

exports.generate = function keyGeneration (event, path, key) {
  return utcTimeStamp() + '~' + event + '~' + path + '~' + key
}

exports.parse = function keyParse (eventKey) {
  var elements = eventKey.split('~')
  if (elements.length !== 4) {
    return false
  }
  return {
    timestamp: elements[0],
    event: elements[1],
    path: elements[2],
    key: elements[3],
    stamp: stamp.parse(elements[1])
  }
}
