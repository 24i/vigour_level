const keys = require('../../../lib/event-source/keys')
const test = require('vigour-performance')
var stamp = require('vigour-stamp')
var amount = 1e6

function generateStrings () {
  for (var i = 0; i < amount; i++) {
    var a = i + '~a.b' // eslint-disable-line
  }
}

function generateEventKeys () {
  for (var i = 0; i < amount; i++) {
    keys.events.generate(i, 'a.b')
  }
}

function generateKeyObject () {
  for (var i = 0; i < amount; i++) {
    var a = { event: 'click-' + i, path: 'a.b.c', stamp: stamp.parse('click-' + i) } // eslint-disable-line
  }
}

function parseEventKeys () {
  for (var i = 0; i < amount; i++) {
    keys.events.parse('click-' + i + '.a.b.c')
  }
}

test(generateEventKeys, generateStrings, 5)
test(parseEventKeys, generateKeyObject, 5)
