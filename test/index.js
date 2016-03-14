'use strict'

var test = require('tape')
var Hub = require('vigour-hub')

var dbName = new Date().toString()

test('connect with db', function (t) {
  t.plan(1)
  var hub = new Hub({
    db: {
      inject: require('../lib'),
      name: dbName
    }
  })
  t.ok(hub.db.integral !== undefined, 'db should now contain a levelUp object')
})
