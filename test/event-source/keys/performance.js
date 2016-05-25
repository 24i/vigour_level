const keys = require('../../../lib/event-source/keys')
const test = require('vigour-performance')
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

test(generateKeys, generateStrings, 5)
