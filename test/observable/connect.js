'use strict'

const test = require('tape')
const levelup = require('levelup')

module.exports = function constructTest (obs, dbName) {
  test('connect with leveldb', function (t) {
    t.plan(4)
    t.equal(obs.db.name, dbName, 'The database name should be set and correct')
    t.ok(obs.db.esDb._getDb('current') instanceof levelup, 'db current should now contain a levelUp object')
    t.ok(obs.db.esDb._getDb('next') instanceof levelup, 'db next should now contain a levelUp object')
    t.ok(obs.db.esDb._getDb('data') instanceof levelup, 'db data should now contain a levelUp object')
  })
}
