'use strict'

const _ = require('lodash')
const test = require('vigour-performance')
const amount = 5e4
const generateData = require('./utils/generate-object')

module.exports = function (db, operationsListener) {
  var data = generateData(amount)
  var putData = function levelDBPut () {
    for (var i = 0, max = data.events.length; i < max; i++) {
      db.put(data.events[i].stamp, data.events[i].key, data.events[i].val, function cbPut () {
        return true
      })
    }
  }
  var setData = function lodashSet () {
    var setData = {}
    for (var i = 0, max = data.events.length; i < max; i++) {
      _.set(setData, data.events[i].key, data.events[i].val)
    }
  }
  operationsListener.registerCallback(function putPerformance () {
    test(putData, setData, 15)
  })
}
