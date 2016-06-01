'use strict'
const test = require('tape')
const vstamp = require('vigour-stamp')
const allIsDone = require('./utils/all-is-done')

var executed = {
  baseStamp: vstamp.create('baseSet', 'test'),
  base: {
    event: false,
    data: false
  },
  deepStamp: vstamp.create('baseSet', 'test'),
  deep: {
    event: false,
    data: false
  }
}

module.exports = function testEsSetDefault (obs, dbName, doneStamp) {
  test('observable set on base', function (t) {
    t.plan(4)
    var setBaseData = {a: {b: 'c'}}
    var stamp = vstamp.create('testBase', 'obs')
    obs.db.esDb._getDb('current').on('put', function (key, value) {
      if (executed.base.event === false) {
        t.equal(key, stamp + '.$ROOT.a.b', 'event key should be stamp + base + key')
        t.equal(value, setBaseData.a.b, 'value should be same as set data')
        executed.base.event = true
        allIsDone(executed.deep, function () { vstamp.close(executed.baseStamp) })
      }
    })
    obs.db.esDb._getDb('data').on('put', function (key, value) {
      if (executed.base.data === false) {
        t.equal(key, '$ROOT.a.b')
        t.deepEqual(JSON.parse(value), {val: setBaseData.a.b, stamp: stamp}, 'value should be same as set data and should contain stamp')
        executed.base.data = true
        allIsDone(executed.base, function () { vstamp.close(executed.baseStamp) })
      }
    })
    obs.set(setBaseData, stamp)
  })
  vstamp.on(executed.baseStamp, function () {
    test('observable set deep', function (t) {
      t.plan(4)
      var setDeepData = {f: 'g'}
      var stamp = vstamp.create('testBase', 'obs')
      obs.db.esDb._getDb('current').on('put', function (key, value) {
        if (executed.deep.event === false) {
          t.equal(key, stamp + '.$ROOT.a.f', 'event key should be stamp + base + key')
          t.equal(value, setDeepData.f, 'value should be same as set data')
          executed.deep.event = true
          allIsDone(executed.deep, function () { vstamp.close(executed.baseStamp) })
        }
      })
      obs.db.esDb._getDb('data').on('put', function (key, value) {
        if (executed.deep.data === false) {
          t.equal(key, '$ROOT.a.f')
          t.deepEqual(JSON.parse(value), {val: setDeepData.f, stamp: stamp}, 'value should be same as set data and should contain stamp')
          executed.deep.data = true
          allIsDone(executed.deep, function () { vstamp.close(executed.deepStamp) })
        }
      })
      obs.a.set(setDeepData, stamp)
    })
  })
  vstamp.on(executed.deepStamp, function () { vstamp.close(doneStamp) })
}
