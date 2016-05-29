'use strict'

const _ = require('lodash')
const keyOptions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'foo', 'bar', 'fiz', 'buzz']
const stampOptions = ['', 'click-', 'mac|', 'select-', 'mac|select-', 'linux|', 'linux|click-']

module.exports = function generateObject (max) {
  var returnVal = {
    baseKeyDepths: {},
    events: [],
    res: {}
  }
  var i
  var key
  for (i = 0; i < keyOptions.length; i++) {
    returnVal.baseKeyDepths[keyOptions[i]] = 1 + Math.round(Math.random() * 9)
  }
  for (i = 0; i < max; i++) {
    var baseKey = keyOptions[Math.round(Math.random() * (keyOptions.length - 1))]
    var keyDepth = returnVal.baseKeyDepths[baseKey] || 0
    key = ''
    for (var k = 0; k < keyDepth; k++) {
      if (k !== 0) {
        key += '.'
      }
      key += keyOptions[Math.round(Math.random() * (keyOptions.length - 1))]
    }
    var stamp = stampOptions[Math.round(Math.random() * (stampOptions.length - 1))]
    stamp = (stamp) ? stamp + i : i
    returnVal.events.push({key: key, val: '' + i, stamp: stamp})
    _.set(returnVal.res, key, i)
  }
  return returnVal
}
