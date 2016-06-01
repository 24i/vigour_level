'use strict'
const test = require('tape')
const Observable = require('vigour-observable')
const vstamp = require('vigour-stamp')
const allIsDone = require('./utils/all-is-done')

module.exports = function testReadStream (obs, dbName, doneStamp) {
  var stamps = {
    closeOld: vstamp.create('closeOld', 'test'),
    init: vstamp.create('init', 'test'),
    ready: vstamp.create('ready', 'test')
  }
  var obs2 = new Observable()

  vstamp.on(stamps.closeOld, function () {
    obs2.set({
      db: {
        inject: require('../../lib'),
        stamps: {
          init: stamps.init,
          ready: stamps.ready
        },
        name: dbName
      }
    })
  })

  test('close db observable 1', function (t) {
    t.plan(1)
    obs.db.close(function obsClose () {
      t.false(obs.db.ready.compute(), 'The Database should no longer be ready')
      t.end()
      vstamp.close(stamps.closeOld)
    })
  })

  test('read stream after re-init', function (t) {
    t.plan(2)
    vstamp.on(stamps.ready, function () {
      t.equal(obs2.a.b.compute(), 'c', 'a.b should be set and be "c" (see set-default test)')
      t.equal(obs2.a.f.compute(), 'g', 'a.f should be set and be "g" (see set-default test)')
      t.end()
      obs2.db.close(function closeTwo () {
        obs.db.open(function openOpen () {
          vstamp.close(doneStamp)
        })
      })
    })
  })
}
