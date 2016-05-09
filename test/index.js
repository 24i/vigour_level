'use strict'
var test = require('tape')
var Observable = require('vigour-observable')
var levelup = require('levelup')
var now = new Date()
var dbName = 'test-' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '-' + now.getHours() + now.getMinutes()
var obs

test('connect with leveldb', function (t) {
  t.plan(2)
  obs = new Observable({
    db: {
      inject: require('../lib'),
      name: dbName
    }
  })
  t.equal(obs.db.name.val, dbName, 'The database name should be set and correct')
  console.log('obs', obs)
  t.ok(obs.db.integral instanceof levelup, 'db should now contain a levelUp object')
})
