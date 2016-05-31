'use strict'
const test = require('tape')
const vstamp = require('vigour-stamp')

module.exports = function observableSetTest (obs, dbName) {
  test('observable set', function (t) {
    t.plan(4)
    var stamp = vstamp.create('test', 'obs')
    obs.db.integral._getDb('current').on('put', function (key, value) {
      console.log('event put fired', key, value)
      t.ok(typeof key === 'string', 'key should be string')
      t.false(value === undefined, 'value should not be undefined')
    })
    obs.db.integral._getDb('data').on('put', function (key, value) {
      console.log('data put fired', key, value)
      t.ok(typeof key === 'string', 'key should be string')
      t.false(value === undefined, 'value should not be undefined')
    })
    obs.db.on('ready', function (ready) {
      console.log('ready', ready)
      if (ready === true) {
        obs.set({a: {b: 1}}, stamp)
      }
    })
  })
}
