'use strict'
const test = require('tape')
const vstamp = require('vigour-stamp')
var executed = {
  queue: {
    event: false,
    data: false
  },
  base: {
    event: false,
    data: false
  }
}

module.exports = function observableSetTest (obs, dbName) {
  test('observable set on base via queue', function (t) {
    var setData = {a: {b: 'a'}}
    t.plan(4)
    var stampQueue = vstamp.create('testQueue', 'obs')
    obs.db.integral._getDb('current').on('put', function (key, value) {
      if (executed.queue.event === false) {
        t.equal(key, stampQueue + '.$ROOT')
        t.deepEqual(value, setData, 'value should be same as set data')
        executed.queue.event = true
        allIsDone(executed.queue, testSetBase)
      }
    })
    obs.db.integral._getDb('data').on('put', function (key, value) {
      if (executed.queue.data === false) {
        t.equal(key, '$ROOT')
        t.deepEqual(value, setData, 'value should be same as set data')
        executed.queue.data = true
        allIsDone(executed.queue, testSetBase)
      }
    })
    obs.set(setData, stampQueue)
  })
  var testSetBase = function testSetBase () {
    test('observable set on base', function (t) {
      var setBaseData = {c: 'b'}
      t.plan(4)
      var stamp = vstamp.create('testBase', 'obs')
      obs.db.integral._getDb('current').on('put', function (key, value) {
        if (executed.base.event === false) {
          t.equal(key, stamp + '.$ROOT', 'event key should be stamp + base + key')
          t.deepEqual(value, setBaseData, 'value should be same as set data')
          executed.base.event = true
          allIsDone(executed.base, testDeepSet)
        }
      })
      obs.db.integral._getDb('data').on('put', function (key, value) {
        if (executed.base.data === false) {
          t.equal(key, '$ROOT')
          t.deepEqual(value, setBaseData, 'value should be same as set data')
          executed.base.data = true
          allIsDone(executed.base, testDeepSet)
        }
      })
      obs.set(setBaseData, stamp)
    })
  }
  var testDeepSet = function testDeepSet () {
    test('observable set on deep', function (t) {
      var setDeepData = {d: 'c'}
      t.plan(4)
      var stamp = vstamp.create('testDeep', 'obs')
      obs.db.integral._getDb('current').on('put', function (key, value) {
        if (executed.base.event === false) {
          t.equal(key, stamp + '.$ROOT.a', 'event key should be stamp + base + key')
          t.deepEqual(value, setDeepData, 'value should be same as set data')
          executed.base.event = true
        // allIsDone(executedBase, testSetBase)
        }
      })
      obs.db.integral._getDb('data').on('put', function (key, value) {
        if (executed.base.data === false) {
          t.equal(key, '$ROOT.a')
          t.deepEqual(value, setDeepData, 'value should be same as set data')
          executed.base.data = true
        // allIsDone(executedBase, testSetBase)
        }
      })
      obs.a.set(setDeepData, stamp)
    })
  }
}

function allIsDone (check, callback) {
  var keys = Object.keys(check)
  var allDone = true
  for (var i = 0, max = keys.length; i < max; i++) {
    if (check[keys[i]] === false) {
      allDone = false
    }
  }
  if (allDone) {
    callback()
  }
}
