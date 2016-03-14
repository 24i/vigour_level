'use strict'

var test = require('tape')
var Hub = require('vigour-hub')

var dbName = new Date().toString()
var hub = new Hub()

test('connect with leveldb', function (t) {
  t.plan(1)
  hub.db = {
    inject: require('../lib'),
    name: dbName
  }
  t.ok(hub.db.integral !== undefined, 'db should now contain a levelUp object')
})

test('set to hub, write to db', function (t) {
  t.plan(1)
  hub.set({
    test: {
      a: {
        title: 'x',
        description: 'b'
      },
      b: {
        title: 'y',
        description: 'c'
      }
    }
  })
})
