'use strict'

const keys = require('../../../lib/event-source/keys')
const test = require('tape')

test('parse keys', function (t) {
  t.plan(4)
  t.deepEqual(keys.parse('1.a'), {
    event: '1',
    path: 'a',
    stamp: {val: '1'}
  }, 'should return event, path and stamp')
  t.deepEqual(keys.parse('2.a.b'), {
    event: '2',
    path: 'a.b',
    stamp: {val: '2'}
  }, 'should return event, deepPath and stamp')
  t.deepEqual(keys.parse('click-3.a.b.c'), {
    event: 'click-3',
    path: 'a.b.c',
    stamp: {
      type: 'click',
      val: '3'
    }
  }, 'should return event, deepPath and stamp with type')
  t.deepEqual(keys.parse('source|3.a.b.c'), {
    event: 'source|3',
    path: 'a.b.c',
    stamp: {
      src: 'source',
      val: '3'
    }
  }, 'should return event, deepPath and stamp with source')
  t.end()
})
