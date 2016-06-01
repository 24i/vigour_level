'use strict'
const test = require('tape')
const vstamp = require('vigour-stamp')
const allIsDone = require('./utils/all-is-done')
var executed = {
  event: false,
  data: false
}

module.exports = function setQueueTest (obs, dbName, finishedStamp) {
  test('observable set on base via queue', function (t) {
    t.plan(4)
    var setData = {a: {b: 'a'}}
    var stampQueue = vstamp.create('testQueue', 'obs')
    obs.db.esDb._getDb('current').on('put', function (key, value) {
      if (executed.event === false) {
        t.equal(key, stampQueue + '.$ROOT.a.b', 'key should be {stamp}.{base}.{key}')
        t.equal(value, setData.a.b, 'value should be same as set data')
        executed.event = true
        allIsDone(executed, function () { vstamp.close(finishedStamp) })
      }
    })
    obs.db.esDb._getDb('data').on('put', function (key, value) {
      if (executed.data === false) {
        t.equal(key, '$ROOT.a.b', 'key should be {base}.{key}')
        t.deepEqual(JSON.parse(value), {val: setData.a.b, stamp: stampQueue}, 'value should contain val & stamp')
        executed.data = true
        allIsDone(executed, function () { vstamp.close(finishedStamp) })
      }
    })
    obs.set(setData, stampQueue)
  })
}
