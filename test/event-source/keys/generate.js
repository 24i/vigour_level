'use strict'

const keys = require('../../../lib/event-source/keys')
const test = require('tape')

test('create keys', function createKeys (t) {
  t.plan(3)
  t.equal(/[0-9]+\~1\.a/i.test(keys.generate(1, 'a')), true, 'should return "{timestamp}~1.a"')
  t.equal(/[0-9]+\~click-2\.a\.b/i.test(keys.generate('click-2', 'a.b')), true, 'should return "{timestamp}~click-2.a.b"')
  t.equal(/[0-9]+\~mac\|3\.a\.b\.c/i.test(keys.generate('mac|3', 'a.b.c')), true, 'should return "{timestamp}~mac|3.a.b.c"')
  t.end()
})