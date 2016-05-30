'use strict'

const test = require('tape')
const Observable = require('vigour-observable')
const levelup = require('levelup')
const destroyAllDbs = require('./utils/destroy-dbs')
const now = new Date()
const dbName = 'test-' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '-' + now.getHours() + now.getMinutes()
var obs

test('connect with leveldb', function (t) {
  t.plan(4)
  obs = new Observable({
    db: {
      inject: require('../lib'),
      name: dbName
    }
  })
  t.equal(obs.db.name.val, dbName, 'The database name should be set and correct')
  t.ok(obs.db.integral._getDb('current') instanceof levelup, 'db current should now contain a levelUp object')
  t.ok(obs.db.integral._getDb('next') instanceof levelup, 'db next should now contain a levelUp object')
  t.ok(obs.db.integral._getDb('data') instanceof levelup, 'db data should now contain a levelUp object')
})

test.onFinish(function () {
  console.log(' ')
  console.log(' ')
  destroyAllDbs(obs.db.integral)
})
