'use strict'

const keys = require('../../../lib/event-source/keys')
const test = require('tape')

test('parse keys', function (t) {
  t.plan(4)
  var timestamp = (new Date()).getTime()
  t.deepEqual(keys.parse(timestamp + '~1.a'), {
    timestamp: timestamp,
    event: '1',
    path: 'a',
    stamp: {val: '1'}
  }, 'should return timestamp, event, path and stamp')
  t.deepEqual(keys.parse(timestamp + '~2.a.b'), {
    timestamp: timestamp,
    event: '2',
    path: 'a.b',
    stamp: {val: '2'}
  }, 'should return timestamp, event, deepPath and stamp')
  t.deepEqual(keys.parse(timestamp + '~click-3.a.b.c'), {
    timestamp: timestamp,
    event: 'click-3',
    path: 'a.b.c',
    stamp: {
      type: 'click',
      val: '3'
    }
  }, 'should return timestamp, event, deepPath and stamp with type')
  t.deepEqual(keys.parse(timestamp + '~source|3.a.b.c'), {
    timestamp: timestamp,
    event: 'source|3',
    path: 'a.b.c',
    stamp: {
      src: 'source',
      val: '3'
    }
  }, 'should return timestamp, event, deepPath and stamp with source')
  t.end()
})
