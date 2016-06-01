'use strict'
const test = require('tape')
const Observable = require('vigour-observable')
const allIsDone = require('./utils/all-is-done')

var executed = {
  closeObs: {
    current: false,
    next: false,
    data: false
  }
}

var closeDb = function (db, dbType, callback) {
  db.close(function (e) {
    console.log('closing', dbType, e)
    executed.closeObs[dbType] = true
    allIsDone(executed.closeObs, callback)
  })
}

var closeDbs = function (dbs, callback) {
  console.log('CloseDBs')
  var dbNames = Object.keys(dbs.dbs)
  for (var i = 0, max = dbNames.length; i < max; i++) {
    var dbType = dbNames[i]
    var dbName = dbs.dbs[dbType]
    if (dbs.dbStack[dbName]) {
      closeDb(dbs.dbStack[dbName], dbType, callback)
    }
  }
}

module.exports = function testReadStream (obs, dbName) {
  test('observable re-init', function (t) {
    console.log('testReadStream')
    t.plan(2)
    closeDbs(obs.db.integral, function () {
      var obs2 = new Observable({
        db: {
          inject: require('../../lib'),
          name: dbName
        }
      })
      obs2.db.ready.once(function () {
        console.log('!!! ready')
      })
      console.log('check', obs2)
    })
  })
}
