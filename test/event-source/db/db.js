'use strict'

const test = require('tape')

const periodCalculation = require('../../../lib/event-source/db/period-calculation')
const levelup = require('levelup')
const destroyAllDbs = require('../../utils/destroy-dbs')

module.exports = function (db, dbName, period) {
  var allTests = [
    {
      name: 'Event LevelDB - construct - current',
      test: function (t) {
        var curTs = periodCalculation(period).getTime()
        t.equals(db.dbs.current, curTs, 'timestamps should equal')
        t.ok(db._getDb('current') instanceof levelup, 'DB should be instanceof levelup')
        t.false(db._getDb('current')._stamp, 'Stamp should not be set')
        t.end()
      },
      done: false
    }, {
      name: 'Event LevelDB - construct - next',
      test: function (t) {
        var nextTs = periodCalculation(period, 1).getTime()
        t.equals(db.dbs.next, nextTs, 'timestamps should equal')
        t.ok(db._getDb('next') instanceof levelup, 'DB should be instanceof levelup')
        t.false(db._getDb('next')._stamp, 'stamp should not be set')
        t.end()
      },
      done: false
    }, {
      name: 'Event LevelDB - construct - data',
      test: function (t) {
        t.equals(db.dbs.data, 'data')
        t.ok(db._getDb('data') instanceof levelup, 'DB should be instanceof levelup')
        t.false(db._getDb('data')._stamp, 'stamp should not be set')
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
    destroyAllDbs(db)
  })
}
