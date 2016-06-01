'use strict'
const test = require('tape')
const vstamp = require('vigour-stamp')
var executed = {
  event: false,
  data: false
}

module.exports = function setQueueTest (obs, dbName) {
  test('observable set on base via queue', function (t) {
    var setData = {a: {b: 'a'}}
    t.plan(4)
    var stampQueue = vstamp.create('testQueue', 'obs')
    obs.db.esDb._getDb('current').on('put', function (key, value) {
      if (!executed.event) {
        t.equal(key, stampQueue + '.$ROOT.a.b', 'key should be {stamp}.{base}.{key}')
        t.equal(value, setData.a.b, 'value should be same as set data')
      }
    })
    obs.db.esDb._getDb('data').on('put', function (key, value) {
      if (!executed.data) {
        t.equal(key, '$ROOT.a.b', 'key should be {base}.{key}')
        t.deepEqual(value, {val: setData.a.b, stamp: stampQueue}, 'value should contain val & stamp')
      }
    })
    obs.set(setData, stampQueue)
  })
}
