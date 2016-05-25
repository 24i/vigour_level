'use strict'

var stamp = require('vigour-stamp')
var utcTimeStamp = require('./utc-timestamp').current

exports.generate = function keyGeneration (stamp, path) {
  return utcTimeStamp() + '~' + stamp + '.' + path
}

exports.parse = function keyParse (eventKey) {
  var elements = eventKey.split('~')
  console.log('elements', elements)
  if (elements.length !== 2) {
    return false
  }
  var splitEventPath = elements[1].split('.')
  console.log('splitEventPath', splitEventPath)
  var event = splitEventPath[0]
  var path = splitEventPath.splice(1).join('.')
  console.log('stamp.parse', stamp.parse(event))
  console.log({
    timestamp: parseInt(elements[0]),
    event: event,
    path: path,
    stamp: stamp.parse(event)
  })
  return {
    timestamp: parseInt(elements[0]),
    event: event,
    path: path,
    stamp: stamp.parse(event)
  }
}
