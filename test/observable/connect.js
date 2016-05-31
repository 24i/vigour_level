'use strict'

const test = require('tape')

const levelup = require('levelup')
const destroyAllDbs = require('../utils/destroy-dbs')

module.exports = function constructTest (obs, dbName) {
  test('connect with leveldb', function (t) {
    t.plan(4)
    t.equal(obs.db.name.val, dbName, 'The database name should be set and correct')
    t.ok(obs.db.integral._getDb('current') instanceof levelup, 'db current should now contain a levelUp object')
    t.ok(obs.db.integral._getDb('next') instanceof levelup, 'db next should now contain a levelUp object')
    t.ok(obs.db.integral._getDb('data') instanceof levelup, 'db data should now contain a levelUp object')
  })
}
