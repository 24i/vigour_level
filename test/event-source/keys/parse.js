'use strict'

const keys = require('../../../lib/event-source/keys')
const test = require('tape')

test('parse event keys', function parseEventKeys (t) {
  t.plan(4)
  t.deepEqual(keys.events.parse('1.a'), {
    event: '1',
    path: 'a',
    stamp: {val: '1'}
  }, 'should return event, path and stamp')
  t.deepEqual(keys.events.parse('2.a.b'), {
    event: '2',
    path: 'a.b',
    stamp: {val: '2'}
  }, 'should return event, deepPath and stamp')
  t.deepEqual(keys.events.parse('click-3.a.b.c'), {
    event: 'click-3',
    path: 'a.b.c',
    stamp: {
      type: 'click',
      val: '3'
    }
  }, 'should return event, deepPath and stamp with type')
  t.deepEqual(keys.events.parse('source|3.a.b.c'), {
    event: 'source|3',
    path: 'a.b.c',
    stamp: {
      src: 'source',
      val: '3'
    }
  }, 'should return event, deepPath and stamp with source')
  t.end()
})

test('parse data keys', function parseDataKeys (t) {
  t.plan(4)
  t.deepEqual(keys.data.parse('$ROOT'), {base: 'root'}, 'key containing $BASE should return just base')
  t.deepEqual(keys.data.parse('$ROOT.a.b'), {base: 'root', key: 'a.b'}, 'key containing base and key should return base and key')
  t.deepEqual(keys.data.parse('$ROOT.1456|a.b.c'), {base: 'root', scope: '1456', key: 'a.b.c'}, 'key containing base scope and key should return object with all')
  t.deepEqual(keys.data.parse('$BASE.1234|'), {base: 'base', scope: '1234'}, 'key containing base and scope should return object with base and scope')
  t.end()
})
