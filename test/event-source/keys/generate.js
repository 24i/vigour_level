'use strict'

const keys = require('../../../lib/event-source/keys')
const test = require('tape')

test('create event keys', function createKeys (t) {
  t.plan(3)
  t.equal(keys.events.generate(1, 'a'), '1.a', 'should return "1.a"')
  t.equal(keys.events.generate('click-2', 'a.b'), 'click-2.a.b', 'should return "click-2.a.b"')
  t.equal(keys.events.generate('mac|3', 'a.b.c'), 'mac|3.a.b.c', 'should return "mac|3.a.b.c"')
  t.end()
})

test('create data keys', function createDataKeys (t) {
  t.plan(7)
  t.equal(keys.data.generate(), '$ROOT', 'empty generate should return $ROOT')
  t.equal(keys.data.generate('a.b'), '$ROOT.a.b', 'generate with key should return $ROOT.key')
  t.equal(keys.data.generate('a.b.c', 1456), '$ROOT.1456|a.b.c', 'generate with scope and key should return $ROOT.scope|key')
  t.equal(keys.data.generate('', 1456), '$ROOT.1456|', 'generate with scope should return $ROOT.scope|')
  t.equal(keys.data.generate(false, 1456), '$ROOT.1456|', 'generate with scope should return $ROOT.scope|')
  t.equal(keys.data.generate('a.b.c.d', false, 'parent'), '$PARENT.a.b.c.d', 'generate with base and key should return $(BASE).key')
  t.equal(keys.data.generate('a.b.c.d', 1234, 'base'), '$BASE.1234|a.b.c.d', 'generate with key, base and scope should return $(BASE).scope|key')
  t.end()
})
