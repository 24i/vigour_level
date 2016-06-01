'use strict'

const _ = require('lodash')
const test = require('tape')
var generate = require('./utils/generate-object')

const max = 2048

var dbCallback = function (operation, callback) {
  return function (e) {
    if (!e) {
      successCount[operation]++
    }
    if (callback) {
      callback(successCount[operation]++)
    }
  }
}

var stripUntilFirstOccurance = function stripUntilFirstOccurance (string, char) {
  for (var i = 0, max = string.length; i < max; i++) {
    if (string.charAt(i) === char) {
      return string.slice(i + 1)
    }
  }
}

var successCount = {
  put: 0
}

var checkTest = {
  put: function (t, db, data, operationListener) {
    t.test('Event LevelDB - put - retrieve events', function (ts) {
      var r = db.createEventStream()
      var amountSucceeded = 0
      r.on('data', function currentOnData (data) {
        if (!data.key) {
          return
        }
        var key = stripUntilFirstOccurance(data.key, '.')
        if (_.filter(data.events,
            function (event) {
              if (key === event.key) {
                if (!event.checked) {
                  event.checked = true
                  return true
                }
              }
              return false
            }) >= 0) {
          amountSucceeded++
        } else {
          console.log('Failed', key)
        }
      })
      r.on('end', function onEnd () {
        ts.equal(amountSucceeded, data.events.length, 'all events should be written to db')
        operationListener.operationDone('put-events')
        ts.end()
      })
    })
    t.test('Event LevelDB - put - retrieve dataResult', function (ts) {
      var res = {}
      var r = db.createReadStream()

      r.on('data', function dataOnData (data) {
        if (!data.key) {
          return
        }
        var setValue = JSON.parse(data.value)
        _.set(res, data.key, parseInt(setValue.val))
      })
      r.on('end', function dataOnEnd () {
        ts.deepEqual(res, data.res, 'db end result should be the same as set data')
        operationListener.operationDone('put-data')
        ts.end()
      })
    })
  }
}

module.exports = function (db, allTheOperationsListener) {
  allTheOperationsListener.registerOperations(['put-events', 'put-data'])
  test('Event LevelDB - put', {timeout: max * 10}, function (t) {
    t.plan(3)
    var data = generate(max)
    for (var i = 0; i < max; i++) {
      var event = data.events[i]
      var callback = false
      if (i === (max - 1)) {
        callback = function (successes) {
          t.ok(successes === max, 'all ' + max + ' put operations should be executed')
          if (checkTest.put) {
            checkTest.put(t, db, data, allTheOperationsListener)
          }
        }
      }
      db.put(event.stamp, event.key, event.val, dbCallback('put', callback))
    }
  })
}
