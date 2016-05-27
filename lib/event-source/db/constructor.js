'use strict'

var keys = require('../keys')
var periodCalculation = require('./period-calculation')
var levelup = require('levelup')
var utcTimestamp = require('../utils/utc-timestamp').current
var levelDB = require('../../level-db')

var setDb = function setDb (name, period, add) {
  if (period) {
    var timeStamp = periodCalculation(period, add).getTime()
    console.log('TS', timeStamp)
    return {
      ts: timeStamp,
      name: name + '-' + timeStamp,
      db: levelup(name + '-' + timeStamp, {db: levelDB})
    }
  }
  return {
    name: name,
    db: levelup(name, {db: levelDB})
  }
}

var EventDb = module.exports = function EventDb (name, period) {
  this.name = name
  this.period = period || 'P1D'
  this.dbs = {
    current: setDb(name, this.period),
    next: setDb(name, this.period, 1),
    data: setDb(name)
  }
}

var eventdb = EventDb.prototype

var writeEvent = function (stamp, key, value, dbs, callback) {
  var ts = utcTimestamp()
  var db
  if (ts < dbs.next.ts) {
    db = dbs.current.db
  } else {
    db = dbs.next.db
  }
  db.put(keys.generate(stamp, key, ts), value, callback)
}

eventdb.put = function EventDbSet (stamp, key, value, callback) {
  writeEvent(stamp, key, value, this.dbs, callback)
  this.dbs.data.db.put(key, value)
}

eventdb.delete = function EventDbDelete (stamp, key, callback) {
  writeEvent(stamp, key, '', this.dbs, callback)
  this.dbs.data.db.put(key, '')
}

eventdb.switchDB = function EventSwitchDb () {
  Object.defineProperty(this.dbs, 'current', Object.getOwnPropertyDescriptor(this.dbs, 'next'))
  delete this.dbs.next
  this.dbs.next = setDb(this.name, this.period, 1)
}
