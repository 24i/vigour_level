'use strict'

const _ = require('lodash')
const test = require('tape')

const max = 100 + Math.round(Math.random() * 1000)

const keyOptions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'foo', 'bar', 'fiz']
const stampOptions = ['', 'click-', 'mac|', 'select-', 'mac|select-', 'linux|', 'linux|click-']

var generate = function () {
  var returnVal = {
    baseKeyDepths: {},
    events: [],
    res: {}
  }
  var i
  var key
  for (i = 0; i < keyOptions.length; i++) {
    returnVal.baseKeyDepths[keyOptions[i]] = 1 + Math.round(Math.random() * 9)
  }
  for (i = 0; i < max; i++) {
    var baseKey = keyOptions[Math.round(Math.random() * (keyOptions.length - 1))]
    var keyDepth = returnVal.baseKeyDepths[baseKey] || 0
    key = ''
    for (var k = 0; k < keyDepth; k++) {
      if (k !== 0) {
        key += '.'
      }
      key += keyOptions[Math.round(Math.random() * (keyOptions.length - 1))]
    }
    var stamp = stampOptions[Math.round(Math.random() * (stampOptions.length - 1))]
    stamp = (stamp) ? stamp + i : i
    returnVal.events.push({key: key, val: '' + i, stamp: stamp})
    _.set(returnVal.res, key, i)
  }
  return returnVal
}

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
  put: function (t, db, data) {
    t.test('Event LevelDB - put - retrieve events', function (ts) {
      var r = db.dbs.current.db.createReadStream()
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
        }
      })
      r.on('end', function onEnd () {
        ts.equal(amountSucceeded, data.events.length, 'all events should be written to db')
        ts.end()
      })
    })
    t.test('Event LevelDB - put - retrieve dataResult', function (ts) {
      var res = {}
      var r = db.dbs.data.db.createReadStream()

      r.on('data', function dataOnData (data) {
        if (!data.key) {
          return
        }
        _.set(res, data.key, parseInt(data.value))
      })
      r.on('end', function dataOnEnd () {
        ts.deepEqual(res, data.res, 'db end result should be the same as set data')
        ts.end()
      })
    })
  }
}

module.exports = function (db) {
  test('Event LevelDB - put', {timeout: max * 10}, function (t) {
    t.plan(3)
    var data = generate()
    for (var i = 0; i < max; i++) {
      var event = data.events[i]
      var callback = false
      if (i === (max - 1)) {
        callback = function (successes) {
          t.ok(successes === max, 'all ' + max + ' put operations should be executed')
          if (checkTest.put) {
            checkTest.put(t, db, data)
          }
        }
      }
      db.put(event.stamp, event.key, event.val, dbCallback('put', callback))
    }
  })
}
