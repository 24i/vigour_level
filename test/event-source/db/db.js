'use strict'

const test = require('tape')

const periodCalculation = require('../../../lib/event-source/db/period-calculation')
const levelup = require('levelup')

var destroyDb = function (dbType, desDb) {
  if (desDb.db && desDb.db.options.db && desDb.db.options.db.destroy) {
    desDb.db.close(function (e) {
      var msgType = console.info
      var checkText = '✓'
      if (e) {
        msgType = console.error
        checkText = '☒'
      }
      msgType(checkText + ' closing db ' + dbType + ' should fire no error', e || '')

      desDb.db.options.db.destroy(desDb.db.db.location, function (e) {
        var msgType = console.info
        var checkText = '✓'
        if (e) {
          msgType = console.error
          checkText = '☒'
        }
        msgType(checkText + ' destroying db ' + dbType + ' on location "' + desDb.db.db.location + '" should fire no error', e || '')
      })
    })
  } else {
    console.error('destroying db ' + dbType + ' on location "' + desDb.db.db.location + '" should fire no error')
  }
}

module.exports = function (db, dbName, period) {
  var destroyAllDbs = function () {
    var dbTypes = Object.keys(db.dbs)
    for (var i = 0, max = dbTypes.length; i < max; i++) {
      var dbType = dbTypes[i]
      destroyDb(dbType, db.dbs[dbType])
    }
  }
  var allTests = [
    {
      name: 'Event LevelDB - construct - current',
      test: function (t) {
        var curTs = periodCalculation(period).getTime()
        t.equals(db.dbs.current.ts, curTs, 'timestamps should equal')
        t.equals(db.dbs.current.name, dbName + '-' + curTs, 'name should be default name + timestamp')
        t.ok(db.dbs.current.db instanceof levelup, 'DB should be instanceof levelup')
        t.end()
      },
      done: false
    }, {
      name: 'Event LevelDB - construct - next',
      test: function (t) {
        var nextTs = periodCalculation(period, 1).getTime()
        t.equals(db.dbs.next.ts, nextTs, 'timestamps should equal')
        t.equals(db.dbs.next.name, dbName + '-' + nextTs, 'name should be default name + timestamp')
        t.ok(db.dbs.next.db instanceof levelup, 'DB should be instanceof levelup')
        t.end()
      },
      done: false
    }, {
      name: 'Event LevelDB - construct - data',
      test: function (t) {
        t.equals(db.dbs.data.name, dbName, 'name should be equal')
        t.ok(db.dbs.data.db instanceof levelup, 'DB should be instanceof levelup')
        t.end()
      },
      done: false
    }
  ]

  var executeTest = function (theTest) {
    test(theTest.name, theTest.test)
  }

  for (var i = 0, max = allTests.length; i < max; i++) {
    if (allTests[i] && allTests[i].name && allTests[i].test) {
      executeTest(allTests[i])
    }
  }

  test.onFinish(function () {
    console.log(' ')
    console.log(' ')
    destroyAllDbs()
  })
}
