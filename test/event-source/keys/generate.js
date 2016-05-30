'use strict'

const keys = require('../../../lib/event-source/keys')
const test = require('tape')

test('create keys', function createKeys (t) {
  t.plan(3)
  t.equal(keys.generate(1, 'a'), '1.a', 'should return "1.a"')
  t.equal(keys.generate('click-2', 'a.b'), 'click-2.a.b', 'should return "click-2.a.b"')
  t.equal(keys.generate('mac|3', 'a.b.c'), 'mac|3.a.b.c', 'should return "mac|3.a.b.c"')
  t.end()
})
