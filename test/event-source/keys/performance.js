const keys = require('../../../lib/event-source/keys')
const test = require('vigour-performance')
var stamp = require('vigour-stamp')
var amount = 1e6

function generateStrings () {
  for (var i = 0; i < amount; i++) {
    var a = i + '~a.b' // eslint-disable-line
  }
}

function generateKeys () {
  for (var i = 0; i < amount; i++) {
    keys.generate(i, 'a.b')
  }
}

function generateKeyObject () {
  for (var i = 0; i < amount; i++) {
    var a = { event: 'click-' + i, path: 'a.b.c', stamp: stamp.parse('click-' + i) } // eslint-disable-line
  }
}

function parseKeys () {
  for (var i = 0; i < amount; i++) {
    keys.parse('click-' + i + '.a.b.c')
  }
}

test(generateKeys, generateStrings, 5)
test(parseKeys, generateKeyObject, 5)
